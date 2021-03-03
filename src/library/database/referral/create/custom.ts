import {Pool} from 'promise-mysql'
import {CustomDesignReferral} from '../../../../types'

export default async(pool: Pool, referralId: number, customDesignReferral: CustomDesignReferral) => pool.query('call referral_create_custom(?, ?, ?)', [referralId, customDesignReferral.concept, customDesignReferral.productType]).then(results => results[0][0].id);
