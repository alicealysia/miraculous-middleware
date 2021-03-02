import {Pool} from 'promise-mysql'
import {Task} from '../../../../types'

export default (pool: Pool, task: Task) => pool.query('call create_task(?, ?, ?, ?)', [task.assignment, task.taskName, task.due, task.taskType]).then(results => results[0][0].id);
