import typeorm from '../../typeorm'
import {Client} from '../../typeorm/entity/client'
import {Task} from '../../typeorm/entity/task'

export default async (userid: number, filter: (data: Client) => Client) => {
    return new typeorm(Task).find({
        relations: ['user', 'project', 'project.client'],
        where: {
            user: {
                id: userid
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project.client)));
}