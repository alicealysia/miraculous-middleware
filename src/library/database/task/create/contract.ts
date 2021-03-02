import {Pool} from 'promise-mysql'
import {Contract} from '../../../../types'

export default async(pool: Pool, taskId: number, contract: Contract) => {
    return pool.query('call task_create_contract(?, ?, ?)', [taskId, contract.referringAgent, contract.billerCode]);
}
