import {getConnection, Task, Referral} from '../../typeorm'

// find projects from assignments, then clients from projects, then referrals from clients. finally, check if referral id is among clients.

export default async (userId: number, referralId: number) => {

    const connection = await getConnection();

    const clients = await connection.getRepository(Task).find({
        relations: ['user', 'project', 'project.client'], 
        where: {
            user: {id: userId}
    }}).then(tasks => tasks.map(task => task.project.client));
    
    const client = await connection.getRepository(Referral).findOneOrFail(referralId, {relations: ['client']}).then(referral => referral.client);
    return clients.includes(client);
}