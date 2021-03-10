import {Pool} from 'promise-mysql'
import customDesigns from './custom-design'
import {CustomDesignReferral} from '../../../../types'

export default async(pool: Pool, referralId: number) => {
    const _results = await pool.query('call referral_read_custom(?)', referralId).then((results) => results[0]);
    console.log(_results);
    const customs: CustomDesignReferral[] = await Promise.all(_results.map((custom: CustomDesignReferral) => {
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
    }));
    return customs;
}