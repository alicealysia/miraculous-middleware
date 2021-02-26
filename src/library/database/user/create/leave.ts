import {PoolConnection} from 'promise-mysql'
import {Leave} from '../../../../types'

export default async( connection: PoolConnection, userId: number, leave: Leave) => connection.query(
    'call user_create_leave(?, ?, ?)', 
    [userId, leave.startDate, leave.endDate]
);