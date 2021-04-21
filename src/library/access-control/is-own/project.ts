import typeorm from '../../typeorm'
import {Task} from '../../typeorm/entity/task'

// is a project assigned to a user?

export default async (userId: number, projectId: number) => {
    return new typeorm(Task).findOne({
        relations: ['user', 'project'], 
        where: {
            user: {
                id: userId
            }, 
            project: {
                id: projectId
            }
        }
    }).then(task => true).catch(error => false);
}

//also used by closure, assignMaterial, assignment