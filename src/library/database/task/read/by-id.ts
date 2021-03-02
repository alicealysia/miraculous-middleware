import {Pool} from 'promise-mysql'
import {Task} from '../../../../types'

export default async (pool: Pool, taskId: number) => pool.query('call read_task(?)', taskId).then(value => value[0][0] as Task);
