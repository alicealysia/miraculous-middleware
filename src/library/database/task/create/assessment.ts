import {Pool} from 'promise-mysql'
import {InsertOTAssessment} from '../../../../types'

export default async(pool: Pool, taskId: number, otAssessment: InsertOTAssessment) => pool.query('call task_create_assessment(?, ?, ?, ?)', [taskId, otAssessment.referralReason, otAssessment.billableCode, otAssessment.assessmentDate]);
