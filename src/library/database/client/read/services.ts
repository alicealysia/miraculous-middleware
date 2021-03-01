import {PoolConnection} from 'promise-mysql'
import {Service} from '../../../../types'

export default async(connection: PoolConnection, clientId: number) => connection.query('call client_read_services(?)', clientId).then(results => results[0] as Service[]);
