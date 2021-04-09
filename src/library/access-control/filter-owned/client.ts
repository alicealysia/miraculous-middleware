import {getConnection, Task, Client} from '../../typeorm'

export default async (userid: number, filter: (data: Client) => Client) => {
    const connection = await getConnection();
    return connection.getRepository(Task).find({
        relations: ['user', 'project', 'project.client'],
        where: {
            user: {
                id: userid
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project.client)));
}