import {User} from '../../../types'
import database from '../../database'

// find projects from assignments, then clients from projects, then referrals from clients. finally, check if referral id is among clients.

export default async (user: User, referralId: number) => {
    if (!user.assignments) {
        return false;
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.read.one(assignment.projectId)));
    const clients = await Promise.all(projects.map(project => database.referral.read.list(project.clientId)));
    const referrals = clients.reduce((flattened, referralList) => flattened.concat(referralList));
    return referrals.some(_referral => _referral.id === referralId);
}