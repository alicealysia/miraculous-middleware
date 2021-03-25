import {Pool} from 'promise-mysql'

export default async (connection: Pool, userId: number) => {
    connection.query('call user_delete_skill(?)', userId);
}
