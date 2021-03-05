import byId from './by-id'
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
    let referral = await byId(pool, referralId);
    referral.customDesigns = await custom(pool, referralId);
    referral.equipmentReferrals = await equipment(pool, referralId);
    referral.OTReferrals = await ot(pool, referralId);
    referral.services = await service(pool, referralId);
    return referral;
}
export const readList = async(clientId: number) => getPool().then(pool => list(pool, clientId));

export {byId, custom, equipment, list, ot, service, designs, documents}
