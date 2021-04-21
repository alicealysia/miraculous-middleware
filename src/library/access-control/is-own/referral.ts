import typeorm from '../../typeorm'
import {Task} from '../../typeorm/entity/task'
import {Referral} from '../../typeorm/entity/referral'

// find projects from assignments, then clients from projects, then referrals from clients. finally, check if referral id is among clients.

export default async (userId: number, referralId: number) => {

    const clients = await new typeorm(Task).find({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: userId}
    }}).then(tasks => tasks.map(task => task.project.client));
    
    const client = await new typeorm(Referral).findOne(referralId, {relations: ['client']}).then(referral => referral.client);
    return clients.includes(client);
}