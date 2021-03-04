import approvals from './approvals'
import byId from './by-id'
import list from './list'
import {list as referrals} from '../../referral/read'
import services from './services'
import {getPool} from '../../pool'

export const readOne = async (clientId: number) => {
    const connection = await getPool()
    let client = await byId(connection, clientId);
    client.approvals = await approvals(connection, clientId);
    client.referrals = await referrals(connection, clientId);
    client.services = await services(connection, clientId);
    return client;
}

export const readList = async() => getPool().then(connection => list(connection));

export {approvals as readApprovals, byId as readClientById, list as readClientList, services as readServices}
