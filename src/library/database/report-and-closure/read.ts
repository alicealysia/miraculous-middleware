import {getPool} from '../pool'
import {Closure} from '../../../types'


async function read(): Promise<Closure[]>;
async function read(closureId: number): Promise<Closure>;
async function read (closureId?: number) {
    const pool = await getPool();
    if (closureId) {
        return pool.query('call read_closure(?)', closureId).then(results => results[0][0] as Closure);
    }
    return pool.query('call read_closures()').then(results => results[0] as Closure[]);
}

export default read;
