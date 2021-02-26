import {PoolConnection} from 'promise-mysql'
import {Availability} from '../../../../types'

export default async (connection: PoolConnection, userId: number) => {
    return connection.query('call user_delete_availability(?)', userId);
}
