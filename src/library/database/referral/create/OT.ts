import {Pool} from 'promise-mysql'
import {OTReferral} from '../../../../types'
import otDocument from './ot-document'

export default async(pool: Pool, referralId: number, otReferral: OTReferral) => pool.query(
    'call referral_create_OT(?, ?, ?, ?, ?, ?, ?, ?)', 
    [referralId, otReferral.focus, otReferral.disability, otReferral.therapyGoals, otReferral.clientGoals, otReferral.billableHours, otReferral.bikeHeight, otReferral.bikeWidth]
).then(value => {
    const id = value[0][0].id;
    if (otReferral.documents) {
        return otDocument(pool, id, otReferral.documents);
    }
    return id;
});
