import {Pool} from 'promise-mysql'

export default async (connection: Pool, userId: number) => {
    return connection.query('call user_delete_availability(?)', userId);
}
