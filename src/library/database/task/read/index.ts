import {getPool} from '../../pool'
import assessment from './assessment'
import contract from './contract'
import notes from './notes'
import byId from './by-id'
import list from './list'

/** list returns a list of tasks dependant on the assignment ID, if not list, taskID is used to find a single task and its details */
export default async(id: number, _list: boolean) => {
    const pool = await getPool();
    if (_list) {
        return list(pool, id);
    }
    let task = await byId(pool, id);
    task.assessments = await assessment(pool, id);
    task.contracts = await contract(pool, id);
    task.notes = await notes(pool, id);
    return task;
}
