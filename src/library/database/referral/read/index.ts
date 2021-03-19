import byId from './by-id'
import {Referral} from '../../../../types'
import custom from './custom'
import equipment from './equipment'
import listQuery from './list'
import ot from './ot'
import service from './service'
import designs from './custom-design'
import documents from './document'
import {getPool} from '../../pool'

const one = async(referralId: number) => {
    const pool = await getPool();
    const details = await byId(pool, referralId);
    const customDesigns = await custom(pool, referralId);
    const equipmentReferrals = await equipment(pool, referralId);
    const OTReferrals = await ot(pool, referralId);
    const services = await service(pool, referralId);
    return {...details, customDesigns, equipmentReferrals, OTReferrals, services} as Referral;
}
const list = async(clientId: number) => {
    const pool = await getPool();
    const spines = await listQuery(pool, clientId);
    const referrals = await Promise.all(spines.map(referral => {
        if (!referral.id) {
            throw new Error('wtf???');
        }
        return one(referral.id);
    }));
    return referrals;
}

export default {one, list}

export {byId, custom, equipment, listQuery, ot, service, designs, documents}
