import {Pool} from 'promise-mysql'
import {CustomDesignReferral} from '../../../../types'
import customDesign from './custom-design'

export default async(pool: Pool, referralId: number, customDesignReferral: CustomDesignReferral) => pool.query(
    'call referral_create_custom(?, ?, ?)', 
    [referralId, customDesignReferral.concept, customDesignReferral.productType]
).then(results => {
    const id = results[0][0].id
    if (customDesignReferral.designs) {
        return customDesign(pool, id, customDesignReferral.designs);
    }
    return id;
});
