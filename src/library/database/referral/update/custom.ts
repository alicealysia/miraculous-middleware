import {Pool} from 'promise-mysql'
import {CustomDesignReferral} from '../../../../types'
import {customDesign} from '../create'
import {designs as getDesigns} from '../read'

export default async(pool: Pool, customDesignReferral: CustomDesignReferral) => {
    if (!customDesignReferral.id) {
        throw new Error('no ID');
    }
    await pool.query(
        'call referral_update_custom(?, ?, ?)', 
        [customDesignReferral.id, customDesignReferral.concept, customDesignReferral.productType]
    );
    if (customDesignReferral.designs) {
        const existingDesigns = await getDesigns(pool, customDesignReferral.id);
        const designs = customDesignReferral.designs.filter(design => existingDesigns.includes(design));
        await customDesign(pool, customDesignReferral.id, designs);
    }
}
