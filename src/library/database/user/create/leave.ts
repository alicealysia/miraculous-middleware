import {PoolConnection} from 'promise-mysql'
import {Leave} from '../../../../types'

export default async( connection: PoolConnection, userId: number, leave: Leave[]) => {
    const leaveQueries = leave.map(value => connection.query('call user_create_leave(?, ?, ?)', [userId, value.startDate, value.endDate]));
    return Promise.all(leaveQueries);
}