import {Pool} from 'promise-mysql'
import {EquipmentReferral} from '../../../../types'

export default async (pool: Pool, referralId: number, equipment: EquipmentReferral) => pool.query('call referral_create_equipment(?, ?, ?)', [referralId, equipment.product, equipment.modifications]);
