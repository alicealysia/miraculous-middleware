import {Pool} from 'promise-mysql'
import {Assignment} from '../../../../types'
import task from '../../task'

export default async(pool: Pool, projectId: number) => pool.query(
    'call project_read_assignments(?)', 
    projectId
).then(results => results[0].map(
    (assignment: Assignment) => task.readList(assignment.id).then(taskList => ({
       id: assignment.id,
       hourlyRate: assignment.hourlyRate,
       tasks: taskList,
       userId: assignment.userId,
       userName: assignment.userName,
       accessRights: assignment.accessRights 
    })as Assignment)
    ) as Assignment[]);
