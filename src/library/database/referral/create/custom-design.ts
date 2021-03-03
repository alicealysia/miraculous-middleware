import {Pool} from 'promise-mysql'
import {Design} from '../../../../types'

export default async(pool: Pool, designId: number, designs: Design[]) => Promise.all(designs.map(value => pool.query('call referral_create_custom_design(?, ?)', [designId, value])));
