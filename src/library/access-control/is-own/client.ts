import typeorm, {Entity} from '../../typeorm'

export default async (user: number, clientId: number) => {
    return new typeorm(Entity.Task).findOne({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: user},
            project: {
                client: {id: clientId}
            }
        }}).then(task => true).catch(err => false);
}