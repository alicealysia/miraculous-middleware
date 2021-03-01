import {Pool} from 'promise-mysql'

export default async(connection: Pool, clientId: number) => connection.query('call client_read_referrals(?)', clientId).then(results => results[0].map((value:any) => value.referralLink) as string[]);
