import ot from './ot'
import custom from './custom'
import equipment from './equipment'
import service from './service'
import {custom as newCustom, equipment as newEquipment, ot as newOT, service as newService} from '../create'
import {Referral} from '../../../../types'
import {getPool} from '../../pool'

export default async (referral: Referral) => {
    if (!referral.id) {
        throw new Error('no ID');
    }
    const id = referral.id;
    const pool = await getPool();

    if (referral.equipmentReferrals) {
        const equipmentReferrals = referral.equipmentReferrals.map(equipmentReferral => {
            if (equipmentReferral.id) {
                return equipment(pool, equipmentReferral)
            }
            return newEquipment(pool, id, equipmentReferral);
        });
        await Promise.all(equipmentReferrals)
    }

    if (referral.services) {
        const serviceReferrals = referral.services.map(current => {
            if (current.id) {
                return service(pool, current)
            }
            return newService(pool, id, current);
        });
        await Promise.all(serviceReferrals);
    }

    if (referral.OTReferrals) {
        const OTReferrals = referral.OTReferrals.map(otReferral => {
            if (otReferral.id) {
                return ot(pool, otReferral);
            }
            return newOT(pool, id, otReferral);
        });
        await Promise.all(OTReferrals)
    }

    if (referral.customDesigns) {
        const customDesigns = referral.customDesigns.map(current => {
            if (current.id) {
                return custom(pool, current);
            }
            return newCustom(pool, id, current);
        });
        await Promise.all(customDesigns);
    }
}
