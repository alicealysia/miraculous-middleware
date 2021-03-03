import {Pool} from 'promise-mysql'
import document from './document'
import {OTReferral} from '../../../../types'

export default async(pool: Pool, referralId: number) => pool.query(
    'call referral_read_OT(?)', 
    referralId
).then( async (results) =>
        results[0].map((otReferral: OTReferral) => {
            if (otReferral.id){
                return document(pool, otReferral.id).then(documents => ({
                    id: otReferral.id,
                    focus: otReferral.focus,
                    disability: otReferral.disability,
                    therapyGoals: otReferral.therapyGoals,
                    clientGoals: otReferral.clientGoals,
                    referralId: referralId,
                    billableHours: otReferral.billableHours,
                    bikeHeight: otReferral.bikeHeight,
                    bikeWidth: otReferral.bikeWidth,
                    documents: documents
                } as OTReferral));
            }
            return otReferral;
}) as OTReferral[] );