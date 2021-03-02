import list from './list'
import byId from './by-id'
import assignment from './assignment'
import material from './material'
import {getPool} from '../../pool'

export default async(id?: number) => {
    const pool = await getPool();
    if(!id) {
        return list(pool);
    }
    let project = await byId(pool, id);
    project.assignments = await assignment(pool, id);
    project.materials = await material(pool, id);
    return project;
}
