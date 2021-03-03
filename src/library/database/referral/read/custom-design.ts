import {Pool} from 'promise-mysql'
import {Design} from '../../../../types'

export default async(pool: Pool, designId: number) => pool.query('call referral_read_custom_design(?)', designId).then(results => results[0].map((value: any) => value.design) as Design[]);