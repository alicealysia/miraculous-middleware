import typeorm, {Entity} from '../../typeorm'

export const projects = async (userId: number, filter: (data: Entity.Project) => Entity.Project) => {
    return new typeorm(Entity.Task).find({
        relations: ['user', 'project'],
        where: {
            user: {
                id: userId
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project)));
}