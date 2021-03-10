import {User, Referral} from '../../../types'
import database from '../../database'

export default async (user: User, referrals: Referral[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.readOne(assignment.projectId)));
    return referrals.filter(referral => projects.some(project => project.clientId === referral.clientId));
}