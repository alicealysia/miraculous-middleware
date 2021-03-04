import list from './list'
import byId from './by-id'
import assignment from './assignment'
import material from './material'
import {getPool} from '../../pool'

export const readOne = async(projectId: number) => {
    const pool = await getPool();
    let project = await byId(pool, projectId);
    project.assignments = await assignment(pool, projectId);
    project.materials = await material(pool, projectId);
    return project;
}

export const readList = async() => getPool().then(pool => list(pool));
