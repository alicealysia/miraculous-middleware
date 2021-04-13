import typeorm, {Entity} from '../../typeorm'

export default async (userid: number, filter: (data: Entity.Task) => Entity.Task) => {
    return new typeorm(Entity.Task).find({relations: ['user'], where: {user: {id: userid}}}).then(tasks => tasks.map(task => filter(task)));
}

//list