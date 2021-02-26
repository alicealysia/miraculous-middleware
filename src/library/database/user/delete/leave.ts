import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, leaveId: number) => {
    return connection.query('call user_delete_leave(?)', leaveId);
}
