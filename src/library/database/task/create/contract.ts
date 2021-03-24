import {Pool} from 'promise-mysql'
import {InsertContract} from '../../../../types'

export default async(pool: Pool, taskId: number, contract: InsertContract) => {
    return pool.query('call task_create_contract(?, ?, ?, ?)', [taskId, contract.referringAgent, contract.billerCode, contract.estimate]);
}
