import typeorm, {Entity, getConnection} from '../../typeorm'

export default async (userid: number, filter: (data: Entity.Referral) => Entity.Referral) => {
    const connection = await getConnection();
    const allReferrals = await connection.getTreeRepository(Entity.Referral).findTrees();
    const ownedClients = await connection.getRepository(Entity.Task).find({
        relations: ['user', 'project', 'project.client'],
        where: {user: {
            id: userid
        }} 
    }).then(tasks => tasks.map(task => task.project.client));

    return allReferrals.filter(referral => ownedClients.includes(referral.client)).map(referral => filter(referral));
}