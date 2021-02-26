import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, userId: number, WWVPno: number, WWVPexp: Date) => connection.query('call user_update_WWVP(?, ?, ?)', [userId, WWVPno, WWVPexp]);
