import typeorm, {getConnection} from '../../typeorm'
import {Referral} from '../../typeorm/entity/referral'
import {Task} from '../../typeorm/entity/task'

export default async (userid: number, filter: (data: Referral) => Referral) => {
    const connection = await getConnection();
    const allReferrals = await connection.getTreeRepository(Referral).findTrees();
    const ownedClients = await connection.getRepository(Task).find({
        relations: ['user', 'project', 'project.client'],
        where: {user: {
            id: userid
        }} 
    }).then(tasks => tasks.map(task => task.project.client));

    return allReferrals.filter(referral => ownedClients.includes(referral.client)).map(referral => filter(referral));
}