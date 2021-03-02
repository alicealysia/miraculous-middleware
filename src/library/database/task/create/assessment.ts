import {Pool} from 'promise-mysql'
import {OTAssessment} from '../../../../types'

export default async(pool: Pool, taskId: number, otAssessment: OTAssessment) => pool.query('call task_create_assessment(?, ?, ?, ?)', [taskId, otAssessment.referralReason, otAssessment.billableCode, otAssessment.assessmentDate]);
