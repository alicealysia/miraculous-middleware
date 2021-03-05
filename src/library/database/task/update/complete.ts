import {getPool} from '../../pool'
import {CompleteTask} from '../../../../types'

export default async(task: CompleteTask) => 
getPool().then(pool => pool.query('call task_update_complete(?, ?, ?, ?, ?, ?)', 
        [task.id, task.actualHours, task.actualTravel, task.note.note, task.note.noteDate, task.report]));
