import {User} from '../../../types'
import database from '../../database'

export const create = async (user: User, clientId: number) => {
    if (!user.assignments) {
        return false;
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.read.one(assignment.projectId)));
    return projects.some(project => project.clientId === clientId);
}

export const existing = async (user: User, referralId: number) => {
    if (!user.assignments) {
        return false;
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.read.one(assignment.projectId)));
    const clients = await Promise.all(projects.map(project => database.referral.read.list(project.clientId)));
    const referrals = clients.reduce((flattened, referralList) => flattened.concat(referralList));
    return referrals.some(_referral => _referral.id === referralId);
}

export const list = async (user: User, clientId: number) => {
    if (!user.assignments) {
        return false;
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.read.one(assignment.projectId)));
    return projects.some(project => project.clientId === clientId);
}