import {Pool} from 'promise-mysql'
import {Contract} from '../../../../types'

export default async (pool: Pool, taskId: number) =>
    pool.query('call task_read_contract(?)', taskId).then(results => results[0][0] as Contract);