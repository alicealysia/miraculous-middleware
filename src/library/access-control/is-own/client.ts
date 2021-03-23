import {User} from '../../../types'
import database from '../../database'

export default async (user: User, clientId: number) => {
    if (!user.assignments) {
        return false;
    }
    // read assignment projects, then find the projects clients, if project client matches, you own them.
    const projects = await Promise.all(user.assignments.map(assignment => database.project.read.one(assignment.projectId)));
    return projects.some(project => project.clientId === clientId);
}