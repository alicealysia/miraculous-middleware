import {User, Client} from '../../../types'
import database from '../../database'

export default async (user: User, clients: Client[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const projects = await Promise.all(user.assignments.map(assignment => database.project.readOne(assignment.projectId)));
    return clients.filter(client => projects.some(project => project.clientId === client.id));
}