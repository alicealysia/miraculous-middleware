import typeorm, {Task} from '../../typeorm'

// is a project assigned to a user?

export default async (userId: number, projectId: number) => {
    const repo = await typeorm.getRepository(Task);
    return repo.findOneOrFail({
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