import {Pool} from 'promise-mysql'
import {Referral} from '../../../../types'

export default async(pool: Pool, clientId: number) => pool.query('call client_read_referrals(?)', clientId).then(results => results[0] as Referral[]);
