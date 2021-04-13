import typeorm, {Entity} from '../../typeorm'

// find projects from assignments, then clients from projects, then referrals from clients. finally, check if referral id is among clients.

export default async (userId: number, referralId: number) => {

    const clients = await new typeorm(Entity.Task).find({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: userId}
    }}).then(tasks => tasks.map(task => task.project.client));
    
    const client = await new typeorm(Entity.Referral).findOne({relations: ['client']}, referralId).then(referral => referral.client);
    return clients.includes(client);
}