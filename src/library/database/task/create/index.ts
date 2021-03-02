import details from './details'
import contract from './contract'
import assessment from './assessment'
import {Task, Contract, OTAssessment} from '../../../../types'
import {getPool} from '../../pool'

export const create = async(task: Task) => {
    const pool = await getPool();
    const taskId = await details(pool, task);
    if (task.assessments) {
        const assessments = task.assessments.map(otAssessment => assessment(pool, taskId, otAssessment));
        await Promise.all(assessments);
    }
    if (task.contracts) {
        const contracts = task.contracts.map(thisContract => contract(pool, taskId, thisContract));
        await Promise.all(contracts);
    }
}

export const createContract = async(taskId: number, _contract: Contract) => {
    const pool = await getPool();
    return contract(pool, taskId, _contract);
}

export const createOTAssessment = async(taskId: number, _otAssessment: OTAssessment) => {
    const pool = await getPool();
    return assessment(pool, taskId, _otAssessment);
}
