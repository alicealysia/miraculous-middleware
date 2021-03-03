import {Pool} from 'promise-mysql'
import customDesigns from './custom-design'
import {CustomDesignReferral} from '../../../../types'

export default async(pool: Pool, referralId: number) => pool.query(
    'call referral_read_custom(?)', 
    referralId
).then( async (results) =>
        results[0].map((custom: CustomDesignReferral) => {
            if (custom.id){
                return customDesigns(pool, custom.id).then(design => ({
                    id: custom.id,
                    referralId: referralId,
                    productType: custom.productType,
                    concept: custom.concept,
                    designs: design
                } as CustomDesignReferral));
            }
            return custom;
        }) as CustomDesignReferral[] );