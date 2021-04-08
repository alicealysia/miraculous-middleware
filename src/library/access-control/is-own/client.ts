import {getConnection, Assignment} from '../../typeorm'

export default async (user: number, clientId: number) => {
    const connection = await getConnection();
    const clients = await connection.getRepository(Assignment).find({relations: ['user', 'project', 'project.clientId'], where: {userId: user}}).then(assignments => assignments.map(assignment => assignment.projectId.clientId));
    // read assignment projects, then find the projects clients, if project client matches, you own them.
    return clients.some(client => client.id === clientId);
}