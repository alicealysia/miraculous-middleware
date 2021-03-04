import details from './details'
import contract from './contract'
import assessment from './assessment'
import {InsertTask, InsertContract, InsertOTAssessment} from '../../../../types'
import {getPool} from '../../pool'

export const create = async(task: InsertTask) => {
    const pool = await getPool();
    const taskId = await details(pool, task);
    if (task.assessment) {
        await assessment(pool, taskId, task.assessment);
    }
    if (task.contract) {
        await contract(pool, taskId, task.contract);
    }
}

export const createContract = async(taskId: number, _contract: InsertContract) => {
    const pool = await getPool();
    return contract(pool, taskId, _contract);
}

export const createOTAssessment = async(taskId: number, _otAssessment: InsertOTAssessment) => {
    const pool = await getPool();
    return assessment(pool, taskId, _otAssessment);
}
