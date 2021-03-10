import {Pool} from 'promise-mysql'

export default async(connection: Pool, userId: number) => connection.query('call user_read_availability(?)', userId).then(results => results[0]);
