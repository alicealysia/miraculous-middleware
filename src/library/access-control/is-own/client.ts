import typeorm from '../../typeorm'
import {Task} from '../../typeorm/entity/task'

export default async (user: number, clientId: number) => {
    return new typeorm(Task).findOne({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: user},
            project: {
                client: {id: clientId}
            }
        }}).then(task => true).catch(err => false);
}