import approvals from './approvals'
import byId from './by-id'
import listQuery from './list'
import {listQuery as referrals} from '../../referral/read'
import services from './services'
import {getPool} from '../../pool'

const one = async (clientId: number) => {
    const connection = await getPool()
    let client = await byId(connection, clientId);
    client.approvals = await approvals(connection, clientId);
    client.referrals = await referrals(connection, clientId);
    client.services = await services(connection, clientId);
    return client;
}

const list = async() => getPool().then(connection => listQuery(connection));

export default {one, list}

export {approvals as readApprovals, byId as readClientById, list as readClientList, services as readServices}
