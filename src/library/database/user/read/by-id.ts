import {PoolConnection} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: PoolConnection, userId: number) => {
    let user : User = await connection.query('call read_user(?)', userId).then(results => results[0][0]);
    user.availability = await connection.query('call user_read_availability(?)', userId).then(results => results[0]);
    user.leave = await connection.query('call user_read_leave(?)', userId).then(results => results[0]);
    user.skills = await connection.query('call user_read_skills(?)', userId).then(results => results[0]);

    return user;
}