import {User} from '../../../types'
import database from '../../database'

export default async (user: User, clientId: number) => {
    if (!user.assignments) {
        return false;
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.readOne(assignment.projectId)));
    return projects.some(project => project.clientId === clientId);
}