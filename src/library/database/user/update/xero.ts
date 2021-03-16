import {Pool} from 'promise-mysql'

export default async (connection: Pool, userId: number, xeroToken: string) => {
    await connection.query('call user_update_xero(?, ?)', [userId, xeroToken]);
}