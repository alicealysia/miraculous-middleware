import {PoolConnection} from 'promise-mysql'

export default async(connection: PoolConnection, userId: number) => connection.query('call user_read_availability(?)', userId).then(results => results[0]);
