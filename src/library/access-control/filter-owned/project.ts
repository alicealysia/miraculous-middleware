import typeorm from '../../typeorm'
import {Project} from '../../typeorm/entity/project'
import {Task} from '../../typeorm/entity/task'

export const projects = async (userId: number, filter: (data: Project) => Project) => {
    return new typeorm(Task).find({
        relations: ['user', 'project'],
        where: {
            user: {
                id: userId
            }
        }
    }).then(tasks => tasks.map(task => filter(task.project)));
}