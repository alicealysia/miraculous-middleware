import {getPool} from '../../pool'
import {Task, Note} from '../../../../types'

export default async(task: Task, note: Note) => 
getPool().then(pool => pool.query('call task_update_complete(?, ?, ?, ?, ?, ?)', 
        [task.id, task.actualHours, task.actualTravel, note.note, note.noteDate, task.report]));
