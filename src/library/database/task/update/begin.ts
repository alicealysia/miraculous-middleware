import {getPool} from '../../pool'
import {BeginTask} from '../../../../types'

export default async(task: BeginTask) => 
    getPool().then(pool => pool.query('call task_update_begin(?, ?, ?, ?, ?, ?, ?)', 
        [task.id, task.estimatedHours, task.estimatedTravel, task.note.note, task.actualHours, task.actualTravel, task.note.noteDate]));

