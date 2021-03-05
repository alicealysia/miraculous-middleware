import {Pool} from 'promise-mysql'
import {Assignment} from '../../../../types'
import list from '../../task/read/list'

export default async(pool: Pool, projectId: number) => {
    const initialQuery = await pool.query('call project_read_assignments(?)', projectId).then(results => results[0] as Assignment[]);
    console.log(initialQuery);
    return Promise.all(initialQuery.map(
        (assignment: Assignment) => list(pool, assignment.id).then(taskList => ({
           id: assignment.id,
           hourlyRate: assignment.hourlyRate,
           tasks: taskList,
           userId: assignment.userId,
           userName: assignment.userName,
           accessRights: assignment.accessRights 
        })as Assignment)));
};
