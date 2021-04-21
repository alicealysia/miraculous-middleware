import typeorm from '../../typeorm'
import {Task} from '../../typeorm/entity/task'

export default async (userid: number, filter: (data: Task) => Task) => {
    return new typeorm(Task).find({relations: ['user'], where: {user: {id: userid}}}).then(tasks => tasks.map(task => filter(task)));
}

//list