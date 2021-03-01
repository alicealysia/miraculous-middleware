import {Pool} from 'promise-mysql'
import {Service} from '../../../../types'

export default async(connection: Pool, clientId: number) => connection.query('call client_read_services(?)', clientId).then(results => results[0].map((value: any) => value.service) as Service[]);
