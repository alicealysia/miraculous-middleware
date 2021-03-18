import details from './details'
import contractQuery from './contract'
import assessment from './assessment'
import {InsertTask, InsertContract, InsertOTAssessment} from '../../../../types'
import {getPool} from '../../pool'

const create = async(task: InsertTask) => {
    const pool = await getPool();
    const taskId = await details(pool, task);
    if (task.assessment) {
        await assessment(pool, taskId, task.assessment);
    }
    if (task.contract) {
        await contractQuery(pool, taskId, task.contract);
    }
}

const contract = async(taskId: number, _contract: InsertContract) => {
    const pool = await getPool();
    return contractQuery(pool, taskId, _contract);
}

const otAssessment = async(taskId: number, _otAssessment: InsertOTAssessment) => {
    const pool = await getPool();
    return assessment(pool, taskId, _otAssessment);
}

const assign = {contract, otAssessment}

export {create, assign}
