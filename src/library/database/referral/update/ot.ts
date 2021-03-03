import {Pool} from 'promise-mysql'
import {OTReferral} from '../../../../types'
import {otDocument} from '../create'
import {documents as getDocuments} from '../read'

export default async(pool: Pool,otReferral: OTReferral) => {
    if (!otReferral.id) {
        throw new Error('no ID');
    }
    await pool.query(
        'call referral_update_OT(?, ?, ?, ?, ?, ?, ?, ?)', 
        [otReferral.id, otReferral.focus, otReferral.disability, otReferral.therapyGoals, otReferral.clientGoals, otReferral.billableHours, otReferral.bikeHeight, otReferral.bikeWidth]
    );
    if (otReferral.documents) {
        const existingDocuments = await getDocuments(pool, otReferral.id);
        const documents = otReferral.documents.filter(document => existingDocuments.includes(document));
        await otDocument(pool, otReferral.id, documents);
    }
}
