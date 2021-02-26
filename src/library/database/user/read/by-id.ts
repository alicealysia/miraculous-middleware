import {getConnection} from '../../pool'
import {User} from '../../../../types'

export default async (userId: number) => {
    const connection = await getConnection;
    let user : User = await connection.query('call read_user(?)', userId).then(results => results[0][0]);
    user.availability = await connection.query('call user_read_availability(?)', userId).then(results => results[0]);
    user.leave = await connection.query('call user_read_leave(?)', userId).then(results => results[0]);
    user.skills = await connection.query('call user_read_skills(?)', userId).then(results => results[0]);
    connection.release();
    return user;
}