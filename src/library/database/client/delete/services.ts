import {Pool} from 'promise-mysql'

export default async(connection: Pool, clientId: number) => connection.query('call client_delete_services(?)', clientId);
