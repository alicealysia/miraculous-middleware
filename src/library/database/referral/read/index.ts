import byId from './by-id'
import {Referral} from '../../../../types'
import custom from './custom'
import equipment from './equipment'
import list from './list'
import ot from './ot'
import service from './service'
import designs from './custom-design'
import documents from './document'
import {getPool} from '../../pool'

export const readOne = async(referralId: number) => {
    const pool = await getPool();
    const details = await byId(pool, referralId);
    const customDesigns = await custom(pool, referralId);
    const equipmentReferrals = await equipment(pool, referralId);
    const OTReferrals = await ot(pool, referralId);
    const services = await service(pool, referralId);
    return {...details, customDesigns, equipmentReferrals, OTReferrals, services} as Referral;
}
export const readList = async(clientId: number) => getPool().then(pool => list(pool, clientId));

export {byId, custom, equipment, list, ot, service, designs, documents}
