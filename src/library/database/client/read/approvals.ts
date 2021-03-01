import {Pool} from 'promise-mysql'

export default async(connection: Pool, clientId: number) => connection.query('call client_read_approvals(?)', clientId).then(results => results[0].map((value: any) => value.approvalLink) as string[]);
