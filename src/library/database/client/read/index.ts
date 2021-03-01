import approvals from './approvals'
import byId from './by-id'
import list from './list'
import referrals from './referrals'
import services from './services'
import {getConnection} from '../../pool'

export default async (clientId?: number) => {
    const connection = await getConnection;
    if (!clientId) {
        return list(connection).then(result => {
            connection.release(); 
            return result
        });
    }
    let client = await byId(connection, clientId);
    client.approvals = await approvals(connection, clientId);
    client.referrals = await referrals(connection, clientId);
    client.services = await services(connection, clientId);
    connection.release();
    return client;
}
