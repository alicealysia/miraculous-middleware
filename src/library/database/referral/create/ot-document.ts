import {Pool} from 'promise-mysql'
import {OTDocument} from '../../../../types'

export default async(pool: Pool, referralOtId: number, documents: OTDocument[]) => Promise.all(documents.map(document => pool.query('call referral_create_document(?, ?, ?)', [referralOtId, document.docType, document.docLink])))
