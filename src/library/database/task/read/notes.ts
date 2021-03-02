import {Pool} from 'promise-mysql'
import {Note} from '../../../../types'

export default async (pool: Pool, taskId: number) =>
    pool.query('call task_read_notes(?)', taskId).then(results => results[0] as Note[]);
