import {getPool} from '../../pool'
import {Task, Note} from '../../../../types'

export default async(taskId: number, hours: number, travel: number, note: Note) => 
getPool().then(pool => pool.query('call update_task(?, ?, ?, ?, ?)', 
        [taskId, hours, travel, note.note, note.noteDate]));
