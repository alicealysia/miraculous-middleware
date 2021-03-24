import {Pool} from 'promise-mysql'

export default async (connection: Pool, userId: number, WWVPno: number, WWVPexp: Date) => connection.query('call user_update_WWVP(?, ?, ?)', [userId, WWVPno, WWVPexp]);
