import {PoolConnection} from 'promise-mysql'
import {Client} from '../../../../types';

export default async (connection: PoolConnection) => connection.query('call read_clients()').then(value => value[0] as Client[]);
