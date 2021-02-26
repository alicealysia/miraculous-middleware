import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, userId: number) => connection.query('call user_read_leave(?)', userId).then(results => results[0]);