import details from './details'
import {getConnection} from '../../pool'
import del from '../delete'
import {readApprovals, readReferrals} from '../read'
import {createApprovals, createReferrals, createServices} from '../create'
import {Client} from '../../../../types'

export default async(client: Client) => {
    if (!client.id) {
        throw new Error('no client ID');
    }
    const connection = await getConnection;
    await details(connection, client);
    if (client.approvals) {
        const oldApprovals = await readApprovals(connection, client.id);
        const approvals = client.approvals.filter(approval => !oldApprovals.includes(approval));
        if (approvals.length > 0) {
            await createApprovals(connection, client.id, approvals);
        }
    }
    if (client.referrals) {
        const oldReferrals = await readReferrals(connection, client.id);
        const referrals = client.referrals.filter(referral => !oldReferrals.includes(referral));
        if (referrals.length > 0) {
            await createReferrals(connection, client.id, referrals);
        }
    }
    if (client.services) {
        await del.services(connection, client.id);
        await createServices(connection, client.id, client.services);
    }
    connection.release();
}
