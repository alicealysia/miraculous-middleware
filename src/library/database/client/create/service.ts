import {PoolConnection} from 'promise-mysql'
import {Service} from '../../../../types'

export default async (connection: PoolConnection, clientId: number, services: Service[]) => {
    const queries = services.map(service => connection.query('call client_assign_service(?, ?)', [clientId, service]));
    return Promise.all(queries);
}
