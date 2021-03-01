import {Pool} from 'promise-mysql'
import {Client} from '../../../../types'

export default async(connection: Pool, clientId: number) => connection.query('call client_read_individual(?)', clientId).then(results => results[0][0] as Client);
