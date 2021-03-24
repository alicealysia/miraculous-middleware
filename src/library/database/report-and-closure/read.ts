import {getPool} from '../pool'
import {Closure} from '../../../types'

export default async(closureId?: number) => {
    const pool = await getPool();
    if (closureId) {
        return pool.query('call read_closure(?)', closureId).then(results => results[0][0] as Closure);
    }
    return pool.query('call read_closures()').then(results => results[0] as Closure[]);
}
