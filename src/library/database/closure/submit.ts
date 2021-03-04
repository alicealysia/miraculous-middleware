import {getPool} from '../pool'
import {Closure} from '../../../types'

export default async(closure: Closure, finalReport: string, closureDate: Date) => {
    const pool = await getPool();
    return pool.query('call project_close(?, ?, ?, ?, ?)', [closure.projectId, closureDate, closure.totalHours, closure.totalCost, finalReport]);
}
