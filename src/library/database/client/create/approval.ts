import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, clientId: number, approvals: string[]) => {
    const queries = approvals.map(approvalLink => connection.query('call client_create_approval(?, ?)', [clientId, approvalLink]));
    return Promise.all(queries);
}