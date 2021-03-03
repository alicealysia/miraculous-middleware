import spine from './spine'
import ot from './OT'
import otDocument from './ot-document'
import customDesign from './custom-design'
import custom from './custom'
import equipment from './equipment'
import service from './service'
import {Referral} from '../../../../types'
import {getPool} from '../../pool'

export default async (referral: Referral) => {
    if (!referral.clientId) {
        throw new Error('no client')
    }
    const pool = await getPool();
    const id = await spine(pool, referral.clientId);
    if (referral.equipmentReferrals) {
        await Promise.all(referral.equipmentReferrals.map(equipmentReferral => equipment(pool, id, equipmentReferral)));
    }
    if (referral.services) {
        await Promise.all(referral.services.map(current => service(pool, id, current)));
    }

    if (referral.OTReferrals) {
        await Promise.all(referral.OTReferrals.map(otReferral => ot(pool, id, otReferral)));
    }
    if (referral.customDesigns) {
        await Promise.all(referral.customDesigns.map(current => custom(pool, id, current)));
    }
}

export {spine, ot, otDocument, customDesign, custom, equipment, service}
