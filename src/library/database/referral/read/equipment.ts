import {Pool} from 'promise-mysql'
import {EquipmentReferral} from '../../../../types'

export default async(pool: Pool, referralId: number) => pool.query('call referral_read_equipment(?)', referralId).then(results => results[0] as EquipmentReferral[]);
