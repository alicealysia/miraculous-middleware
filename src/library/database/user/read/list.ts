import {getConnection} from '../../pool'
import {User} from '../../../../types'

export default async () => {
    const connection = await getConnection;
    const userList : User[] = await connection.query('call read_users()');
    connection.release();
    return userList
}