import {Pool} from 'promise-mysql'
import {Referral} from '../../../../types'

export default async(pool: Pool, referralId: number) => pool.query('call read_referral(?)', referralId).then(results => results[0][0] as Referral);
