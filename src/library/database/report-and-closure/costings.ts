import {getPool} from '../pool'
import DBproject from '../project'
import DBcontract from '../task/read/contract'
import {Costings, Project, UserCostings, Task, Contract} from '../../../types'

const defaultUserEstimates: UserCostings = {accessRights: 'volunteer', fullName: '', actualHours: 0, actualTravel: 0, hourlyRate: 0};

export default async(projectId: number) => {
    const pool = await getPool();
    const project = await DBproject.read.one(projectId) as Project;

    const userCostings = project.assignments?.reduce<UserCostings[]>((finallist: UserCostings[], assignment) => 
    finallist.concat( assignment.tasks.reduce<UserCostings>((estimate: UserCostings, task) => ({
                accessRights: assignment.accessRights ?? 'volunteer', 
                fullName: assignment.userName, 
                hourlyRate: assignment.hourlyRate,
                actualTravel: estimate.actualTravel + (task.actualTravel ?? 0),
                actualHours: estimate.actualHours + (task.actualHours ?? 0)
    }), defaultUserEstimates)), []);

    const materials = project.materials;
    const contractsUnfound = project.assignments?.reduce<Task[]>((taskList: Task[], assignment) => taskList.concat(assignment.tasks), []).map(task => DBcontract(pool, task.id));
    let contracts: Contract[] = []
    if (contractsUnfound) {
        contracts = await Promise.all(contractsUnfound);
    }

    const totalHours = userCostings?.reduce<number>((total: number, estimate) => total + estimate.actualHours, 0);
    const totalLabor = userCostings?.reduce<number>((total: number, estimate) => total + ((estimate.actualHours/3600000) * estimate.hourlyRate), 0);
    const totalMaterialCost = materials?.reduce<number>((total: number, material) => total + (material.cost * material.units), 0);
    const totalContractCost = contracts?.reduce<number>((total: number, contract) => total + contract.estimate, 0);

    const totalCost = (totalHours ?? 0) + (totalLabor ?? 0) + (totalMaterialCost ?? 0) + (totalContractCost ?? 0);

    return {
        projectId,
        userCostings,
        materials,
        contracts,
        totalHours,
        totalLabor,
        totalMaterialCost,
        totalContractCost,
        totalCost

    } as Costings
}