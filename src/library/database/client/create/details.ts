import {PoolConnection} from 'promise-mysql'
import {Client} from '../../../../types' 

export default async (connection: PoolConnection, client: Client) => connection.query('call create_client(?,?,?,?,?,?,?,?,?,?,?,?)', [
    client.fullName, 
    client.DOB, 
    client.address, 
    client.phone, 
    client.email, 
    client.supportCoordinator, 
    client.funding, 
    client.NDIS, 
    client.orgName, 
    client.gender, 
    client.occupation, 
    client.disability
]).then(value => value[0][0].id);
