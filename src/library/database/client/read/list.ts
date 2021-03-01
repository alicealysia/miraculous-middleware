import {Pool} from 'promise-mysql'
import {Client} from '../../../../types';

export default async (connection: Pool) => connection.query('call read_clients()').then(value => value[0] as Client[]);
