import {getPool} from '../pool'
import DBproject from '../project'
import DBcontract from '../task/read/contract'
import {Closure, Project, UserCosts, Task, Contract} from '../../../types'

export default async(projectId: number) => {
    const project = await DBproject.read.one(projectId) as Project;
    if (!project.assignments) {
        throw new Error('project has no assignments');
    }
    const assignments = project.assignments;
    const materials = project.materials;
    const materialEstimates = project.materials;
    let reports: string[] = [];
    const userCosts = assignments.map(assignment => assignment.tasks.reduce<UserCosts>((usercost: UserCosts, task: Task) => {
        if (task.estimatedHours === undefined || task.estimatedTravel === undefined || task.actualHours === undefined || task.actualTravel === undefined || !task.complete) {
            throw new Error ('task not complete');
        }
        if (task.report) {
            reports.push(task.report);
        }
        return {
            fullName: assignment.userName,
            accessRights: assignment.accessRights,
            hourlyRate: assignment.hourlyRate,
            hoursEstimate: usercost.hoursEstimate + task.estimatedHours,
            estimatedTravel: usercost.estimatedTravel + task.estimatedTravel,
            actualHours: usercost.actualHours + task.actualHours,
            actualTravel: usercost.actualTravel + task.actualTravel
        } as UserCosts
    }, ({
        fullName: assignment.userName,
        accessRights: assignment.accessRights,
        hourlyRate: assignment.hourlyRate,
        hoursEstimate: 0,
        estimatedTravel: 0,
        actualHours: 0,
        actualTravel: 0
    }) as UserCosts));
    
    const pool = await getPool()
    const contractQueries = assignments.reduce<Promise<Contract>[]>((finalContractList: Promise<Contract>[], assignment) => {
        const newContract = assignment.tasks.reduce<Promise<Contract>[]>((contractList: Promise<Contract>[], task: Task) => {
        return contractList.concat(DBcontract(pool, task.id));
    }, []);
    return finalContractList.concat(newContract);
}, [])
    const contracts = await Promise.all(contractQueries);
    const contractorCosts = contracts.map(contract => contract.cost? contract.cost: 0);
    const userCostTotal = userCosts.reduce<number>((total, current) => {
        return total + ((current.actualHours/3600000)* current.hourlyRate) + current.actualTravel;
    }, 0);

    const materialEstimatesTotal = !materialEstimates? 0: materialEstimates.reduce<number>((total, current) => {
        return total + current.cost * current.units;
    }, 0);

    const materialCostTotal = !materials? 0: materials.reduce<number>((total, current) => {
        return total + current.cost * current.units;
    }, 0);

    const contractorCostTotal = contractorCosts.reduce<number>((total, current) => {return total + current}, 0);
    reports = reports.concat(contracts.reduce<string[]>((invoicesAndQuotes, contract) => {
        let newValues: string[] = [];
        if (contract.quoteLink) {
            newValues.push(contract.quoteLink);
        }
        if (contract.invoiceLink) {
            newValues.push(contract.invoiceLink);
        }
        return invoicesAndQuotes.concat(newValues);
    }, []))
    const totalCost = userCostTotal + materialCostTotal + contractorCostTotal;
    const totalHours = userCosts.reduce<number>((total, current) => {
        return total + current.actualHours;
    }, 0);

    return {
        projectId: project.id,
        contractorCosts,
        materials,
        materialEstimates,
        userCosts,
        reports,
        totalHours,
        totalCost
    } as Closure
}
