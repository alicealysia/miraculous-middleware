import {getPool} from '../../pool'
import {Task, Note} from '../../../../types'

export default async(task: Task, note: Note) => 
    getPool().then(pool => pool.query('call task_update_begin(?, ?, ?, ?, ?, ?, ?)', 
        [task.id, task.estimatedHours, task.estimatedTravel, note.note, task.actualHours, task.actualTravel, note.noteDate]));

