import {PoolConnection} from 'promise-mysql'

export default async(connection: PoolConnection, clientId: number) => connection.query('call client_delete_services(?)', clientId);
