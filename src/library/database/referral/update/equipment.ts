import {Pool} from 'promise-mysql'
import {EquipmentReferral} from '../../../../types'

export default async (pool: Pool, equipment: EquipmentReferral) => pool.query('call referral_update_equipment(?, ?, ?)', [equipment.id, equipment.product, equipment.modifications]);
