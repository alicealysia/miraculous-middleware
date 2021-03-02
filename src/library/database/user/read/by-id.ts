import {PoolConnection} from 'promise-mysql'
import availability from './availability'
import leave from './leave'
import assignment from './assignment'
import {User} from '../../../../types'

export default async (connection: PoolConnection, userId: number) => {
    let user : User = await connection.query('call read_user(?)', userId).then(results => results[0][0]);
    user.availability = await availability(connection, userId);
    user.leave = await leave(connection, userId);
    user.skills = await connection.query('call user_read_skills(?)', userId).then(results => results[0]);
    user.assignments = await assignment(connection, userId);

    return user;
}