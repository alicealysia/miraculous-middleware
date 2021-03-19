import {Pool} from 'promise-mysql'
import {InsertClient} from '../../../../types'

export default async(connection: Pool, client: InsertClient) => connection.query('call get_existing_client(?, ?, ?, ?, ?)', [client.fullName, client.DOB, client.address, client.phone, client.email]).then(results => results[0][0].id as number);
