import {Pool} from 'promise-mysql'
import {ServiceReferral} from '../../../../types'

export default async (pool: Pool,service: ServiceReferral) => pool.query('call referral_update_service(?, ?, ?, ?)', [service.id, service.serviceType, service.serviceDescription, service.serialNumber]);
