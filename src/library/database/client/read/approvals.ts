import {PoolConnection} from 'promise-mysql'

export default async(connection: PoolConnection, clientId: number) => connection.query('call client_read_approvals(?)', clientId).then(results => results[0] as string[]);