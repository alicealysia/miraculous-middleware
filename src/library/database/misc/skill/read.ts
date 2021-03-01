import {getPool} from '../../pool'

export default async () => {
    const pool = await getPool();
    return pool.query('read_skills()').then(value => value[0]);
}
