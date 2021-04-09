import typeorm, {Task} from '../../typeorm'

export default async (userid: number, filter: (data: Task) => Task) => {
    const connection = await typeorm.getConnection();
    return connection.getRepository(Task).find({relations: ['user'], where: {user: {id: userid}}}).then(tasks => tasks.map(task => filter(task)));
}

//list