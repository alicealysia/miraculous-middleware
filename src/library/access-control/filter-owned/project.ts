import {Project, Task, getConnection} from '../../typeorm'

export const projects = async (userId: number, filter: (data: Project) => Project) => {
    const connection = await getConnection();
    return connection.getRepository(Task).find({
        relations: ['user', 'project'],
        where: {
            user: {
                id: userId
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project)));
}