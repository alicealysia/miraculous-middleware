import {getPool} from '../pool'
import {InsertClosure} from '../../../types'

export default async(closure: InsertClosure, finalReport: string, closureDate: Date) => {
    const pool = await getPool();
    return pool.query('call project_close(?, ?, ?, ?, ?, ?)', [closure.projectId, closureDate, closure.totalHours, closure.totalCost, closure.totalQuote, finalReport]);
}
