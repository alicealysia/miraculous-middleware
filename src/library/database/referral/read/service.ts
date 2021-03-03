import {Pool} from 'promise-mysql'
import {ServiceReferral} from '../../../../types'

export default async(pool: Pool, referralId: number) => pool.query('call referral_read_service(?)', referralId).then(results => results[0] as ServiceReferral[]);
