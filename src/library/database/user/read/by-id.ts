import {Pool} from 'promise-mysql'
import availability from './availability'
import leave from './leave'
import assignment from './assignment'
import {UninitUser, User} from '../../../../types'

export default async (connection: Pool, userId: number) => {
    const _user: UninitUser = await connection.query('call read_user(?)', userId).then(results => results[0][0]);
    
    const _availability = await availability(connection, userId);
    const _leave = await leave(connection, userId);
    const _skills = await connection.query('call user_read_skills(?)', userId).then(results => results[0]);
    const _assignments = await assignment(connection, userId);

    return {
        ..._user,
        accessRights: _user.accessRights.replace(/\s+/g, '').split(','),
        availability: _availability,
        leave: _leave,
        skills: _skills,
        assignments: _assignments
    } as User
}