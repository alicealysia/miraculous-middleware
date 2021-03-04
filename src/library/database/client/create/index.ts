import approvals from './approval'
import details from './details'
import referral from '../../referral'
import services from './service'
import {getPool} from '../../pool'
import {InsertClient} from '../../../../types'

export default async (client: InsertClient) => {
    const connection = await getPool();
    const clientId = await details(connection, client);
    if (client.approvals) {
        await approvals(connection, clientId, client.approvals);
    }
    if (client.referrals) {
        const referrals = client.referrals.map(value => referral.create(clientId, value));
        await Promise.all(referrals);
    }
    if (client.services) {
        await services(connection, clientId, client.services);
    }
}

export {approvals as createApprovals, details as createDetails, services as createServices}
