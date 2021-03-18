import {getPool} from '../../pool'
import assessment from './assessment'
import contract from './contract'
import notes from './notes'
import byId from './by-id'
import listQuery from './list'

/** list returns a list of tasks dependant on the assignment ID, if not list, taskID is used to find a single task and its details */
const one = async(taskId: number) => {
    const pool = await getPool();
    let task = await byId(pool, taskId);
    task.assessment = await assessment(pool, taskId);
    task.contract = await contract(pool, taskId);
    task.notes = await notes(pool, taskId);
    return task;
}
const list = async(assignmentId: number) => getPool().then(pool => listQuery(pool, assignmentId));

export default {one, list}
