import {Pool} from 'promise-mysql'
import {Assignment} from '../../../../types'

export default async (connection: Pool, projectId: number, assignment: Assignment) => connection.query('call project_assign_user(?, ?)', [projectId, assignment.userId]).then(value => value[0][0].id);
