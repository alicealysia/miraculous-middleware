import {getPool} from '../../pool'
import {Material} from '../../../../types'

export default async () => {
    const pool = await getPool();
    return pool.query('call read_materials()').then(results => results[0] as Material[]);
}
