import {PoolConnection} from 'promise-mysql'
import { Leave } from '../../../../types';

export default async (connection: PoolConnection, leave: Leave[]) => {
    const deletes = leave.map(value => connection.query('call user_delete_leave(?)', value))
    return Promise.all(deletes);
}
