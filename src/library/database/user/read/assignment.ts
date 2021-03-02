import {PoolConnection} from 'promise-mysql'
import {UserAssignment} from '../../../../types'

export default async(connection: PoolConnection, userId: number) => {
    return connection.query('call user_read_assignments(?)', userId).then(result => result[0] as UserAssignment[]);
}

