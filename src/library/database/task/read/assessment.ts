import {Pool} from 'promise-mysql'
import {OTAssessment} from '../../../../types'

export default async (pool: Pool, taskId: number) =>
    pool.query('call task_read_assessment(?)', taskId).then(results => results[0] as OTAssessment);