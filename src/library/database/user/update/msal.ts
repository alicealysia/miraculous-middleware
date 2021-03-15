import {Pool} from 'promise-mysql'

export default async (connection: Pool, userId: number, msalToken: string) => {
    await connection.query('call user_update_msal(?, ?)', [userId, msalToken]);
}