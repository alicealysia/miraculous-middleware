import typeorm, {Entity} from '../../typeorm'

export default async (userid: number, filter: (data: Entity.Client) => Entity.Client) => {
    return new typeorm(Entity.Task).find({
        relations: ['user', 'project', 'project.client'],
        where: {
            user: {
                id: userid
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project.client)));
}