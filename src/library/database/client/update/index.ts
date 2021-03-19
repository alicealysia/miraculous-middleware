import details from './details'
import {getPool} from '../../pool'
import del from '../delete'
import {readApprovals} from '../read'
import {createApprovals, createServices} from '../create'
import referral from '../../referral'
import {Client} from '../../../../types'

export default async(client: Client) => {
    if (!client.id) {
        throw new Error('no client ID');
    }
    const connection = await getPool();
    await details(connection, client);
    if (client.approvals) {
        const oldApprovals = await readApprovals(connection, client.id);
        const approvals = client.approvals.filter(approval => !oldApprovals.includes(approval));
         if (approvals.length > 0) {
            await createApprovals(connection, client.id, approvals);
         }
    }
    if (client.services) {
        await del.services(connection, client.id);
        await createServices(connection, client.id, client.services);
    }
    if (client.referrals) {
        const oldReferrals = await referral.read.list(client.id);
        const newReferrals = client.referrals.filter(referral => !oldReferrals.some(oldReferral => oldReferral.id === referral.id));
        const updateReferrals = client.referrals.filter(referral => oldReferrals.some(oldReferral => oldReferral.id === referral.id));
        const referrals = newReferrals.map(value => referral.create(client.id, value));
        const referralUpdates = updateReferrals.map(value => referral.update(value));
        await Promise.all(referrals);
        await Promise.all(referralUpdates);
    }
}
