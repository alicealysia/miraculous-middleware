import {Pool} from 'promise-mysql'
import {OTDocument} from '../../../../types'

export default async(pool: Pool, referralOtId: number) => pool.query('call referral_read_document(?)', referralOtId).then(results => results[0] as OTDocument[]);