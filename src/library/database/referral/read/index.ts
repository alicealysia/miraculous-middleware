import byId from './by-id'
import custom from './custom'
import equipment from './equipment'
import list from './list'
import ot from './ot'
import service from './service'
import designs from './custom-design'
import documents from './document'
import {getPool} from '../../pool'

export default async(id: number, _list: boolean) => {
    const pool = await getPool();
    if (_list) {
        return list(pool, id);
    }
    let referral = await byId(pool, id);
    referral.customDesigns = await custom(pool, id);
    referral.equipmentReferrals = await equipment(pool, id);
    referral.OTReferrals = await ot(pool, id);
    referral.services = await service(pool, id);
    return referral;
}

export {byId, custom, equipment, list, ot, service, designs, documents}
