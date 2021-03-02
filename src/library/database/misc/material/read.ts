import {getPool} from '../../pool'

export default async () => {
    const pool = await getPool();
    return pool.query('call read_materials()');
}
