import approvals from './approval'
import details from './details'
import referrals from './referral'
import services from './service'
import {getPool} from '../../pool'
import {Client} from '../../../../types'

export default async (client: Client) => {
    const connection = await getPool();
    const clientId = await details(connection, client);
    if (client.approvals) {
        await approvals(connection, clientId, client.approvals);
    }
    if (client.referrals) {
        await referrals(connection, clientId, client.referrals);
    }
    if (client.services) {
        await services(connection, clientId, client.services);
    }
}

export {approvals as createApprovals, details as createDetails, referrals as createReferrals, services as createServices}
