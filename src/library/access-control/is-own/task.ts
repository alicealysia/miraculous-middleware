import {Task} from '../../typeorm/entity/task'
import typeorm from '../../typeorm'

//tasks reference assignment id when created, meaning we just need to check the given ID vs the user assignments

// future versions may include projects PMs can assign users to, or user groups that PMs can assign projects to, or both with both conditions needing to be met, as a result
// this logic could grow in complexity, or multiple functions could be needed, so watch this space.

export const create = async (userid: number, projectId: number) => {
    return new typeorm(Task).findOne({
        relations: ['user', 'project'], 
        where: {
            user: {id: userid}, 
            project: {id: projectId}
        }
    }).then(task => true).catch(err => false);
}

// find tasks within assignments, compare task ID to assignment ID.

export const existing = async (userId: number, taskId: number) => {
    return new typeorm(Task).findOne({
        relations: ['user'],
        where: {
            id: taskId,
            user: {id: userId}
        }
    }).then(task => true).catch(err => false);
}

//contract, otAssessment

export const existingContract = async (userId: number, contractId: number) => {
    return new typeorm(Task).findOne({
        relations: ['user', 'contract'],
        where: {
            contract: {id: contractId},
            user: {id: userId}
        }
    }).then(task => true).catch(err => false);
}