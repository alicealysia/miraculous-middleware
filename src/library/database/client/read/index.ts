import approvals from './approvals'
import byId from './by-id'
import list from './list'
//import referrals from './referrals'
import services from './services'
import {getPool} from '../../pool'

export default async (clientId?: number) => {
    const connection = await getPool();
    if (!clientId) {
        return list(connection);
    }
    let client = await byId(connection, clientId);
    client.approvals = await approvals(connection, clientId);
//    client.referrals = await referrals(connection, clientId);
    client.services = await services(connection, clientId);
    return client;
}

export {approvals as readApprovals, byId as readClientById, list as readClientList, services as readServices}
