import typeorm, {Task} from '../../typeorm'

export default async (user: number, clientId: number) => {
    const repo = await typeorm.getRepository(Task);
    return repo.findOneOrFail({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: user},
            project: {
                client: {id: clientId}
            }
        }}).then(task => true).catch(err => false);
}