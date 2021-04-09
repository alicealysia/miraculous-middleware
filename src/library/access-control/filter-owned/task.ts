import {Task, getConnection} from '../../typeorm'

export default async (userid: number, filter: (data: Task) => Task) => {
    const connection = await getConnection();
    return connection.getRepository(Task).find({relations: ['user'], where: {user: {id: userid}}}).then(tasks => tasks.map(task => filter(task)));
}

//list