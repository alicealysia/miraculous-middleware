import {Pool} from 'promise-mysql'
import {Task} from '../../../../types'

export default async (pool: Pool, assignmentId: number) =>
    pool.query('call assignment_read_tasks(?)', assignmentId).then(results => results[0] as Task[]);
