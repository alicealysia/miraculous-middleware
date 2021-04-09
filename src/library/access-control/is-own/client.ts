import {getConnection, Task} from '../../typeorm'

export default async (user: number, clientId: number) => {
    const connection = await getConnection();
    return connection.getRepository(Task).findOneOrFail({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: user},
            project: {
                client: {id: clientId}
            }
        }}).then(task => true).catch(err => false);
}