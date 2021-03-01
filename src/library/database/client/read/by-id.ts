import {PoolConnection} from 'promise-mysql'
import {Client} from '../../../../types'

export default async(connection: PoolConnection, clientId: number) => connection.query('call client_read_individual(?)', clientId).then(results => results[0][0] as Client);
