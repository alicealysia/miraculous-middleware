import {getPool} from '../pool'
import DBproject from '../project'
import DBcontract from '../task/read/contract'
import {Estimates, Project, UserEstimates, Task, Contract} from '../../../types'

const defaultUserEstimates = {accessRights: 'volunteer', fullName: '', estimatedTravel: 0, hoursEstimate: 0, hourlyRate: 0};

export default async(projectId: number) => {
    const pool = await getPool();
    const project = await DBproject.read.one(projectId) as Project;

    const userEstimates = project.assignments?.reduce<UserEstimates[]>((finallist: UserEstimates[], assignment) => 
    finallist.concat( assignment.tasks.reduce<UserEstimates>((estimate: UserEstimates, task) => ({
                accessRights: assignment.accessRights ?? 'volunteer', 
                fullName: assignment.userName, 
                hourlyRate: assignment.hourlyRate,
                estimatedTravel: estimate.estimatedTravel + (task.estimatedTravel ?? 0),
                hoursEstimate: estimate.hoursEstimate + (task.estimatedHours ?? 0)
    }), defaultUserEstimates)), []);

    const materialEstimates = project.materialsEstimate;
    const contractsUnfound = project.assignments?.reduce<Task[]>((taskList: Task[], assignment) => taskList.concat(assignment.tasks), []).map(task => DBcontract(pool, task.id));
    let contracts: Contract[] = []
    if (contractsUnfound) {
        contracts = await Promise.all(contractsUnfound);
    }

    const totalHours = userEstimates?.reduce<number>((total: number, estimate) => total + estimate.hoursEstimate, 0);
    const totalLabor = userEstimates?.reduce<number>((total: number, estimate) => total + ((estimate.hoursEstimate/3600000) * estimate.hourlyRate), 0);
    const totalMaterialCost = materialEstimates?.reduce<number>((total: number, material) => total + (material.cost * material.units), 0);
    const totalContractEstimate = contracts?.reduce<number>((total: number, contract) => total + contract.estimate, 0);

    const totalCost = (totalHours ?? 0) + (totalLabor ?? 0) + (totalMaterialCost ?? 0) + (totalContractEstimate ?? 0);

    return {
        projectId,
        userEstimates,
        materialEstimates,
        contracts,
        totalHours,
        totalLabor,
        totalMaterialCost,
        totalContractEstimate,
        totalCost

    } as Estimates
}