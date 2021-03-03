import {Pool} from 'promise-mysql'
import {ServiceReferral} from '../../../../types'

export default async (pool: Pool, referralId: number, service: ServiceReferral) => pool.query('call referral_create_service(?, ?, ?, ?)', [referralId, service.serviceType, service.serviceDescription, service.serialNumber]);
