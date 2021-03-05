import details from './details'
import {getPool} from '../../pool'
import del from '../delete'
import {readApprovals} from '../read'
import {createApprovals, createServices} from '../create'
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
}
