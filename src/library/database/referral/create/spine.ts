import {Pool} from 'promise-mysql'

export default async(pool: Pool, clientId: number) => pool.query('call client_create_referral(?)', clientId).then(results => results[0][0].id);
