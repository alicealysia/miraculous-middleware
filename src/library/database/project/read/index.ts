import listQuery from './list'
import byId from './by-id'
import assignment from './assignment'
import material from './material'
import materialsEstimate from './materialEstimate'
import quotes from './quote'
import invoices from './invoice'
import {getPool} from '../../pool'

const one = async(projectId: number) => {
    const pool = await getPool();
    let project = await byId(pool, projectId);
    project.assignments = await assignment(pool, projectId);
    project.materials = await material(pool, projectId);
    project.materialsEstimate = await materialsEstimate(pool, projectId);
    project.quotes = await quotes(pool, projectId);
    project.invoices = await invoices(pool, projectId);
    return project;
}

const list = async() => getPool().then(pool => listQuery(pool));

export default {one, list}
