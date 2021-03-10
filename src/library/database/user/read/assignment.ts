import {Pool} from 'promise-mysql'
import {UserAssignment} from '../../../../types'
import list from '../../task/read/list'


export default async(pool: Pool, userId: number) => {
    const initialQuery = await pool.query('call user_read_assignments(?)', userId).then(results => results[0] as UserAssignment[]);
    return Promise.all(initialQuery.map(
        (assignment: UserAssignment) => list(pool, assignment.id).then(taskList => ({
           id: assignment.id,
           tasks: taskList,
           projectId: assignment.projectId,
           projectName: assignment.projectName
        })as UserAssignment)));
};
