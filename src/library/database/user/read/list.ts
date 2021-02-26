import {PoolConnection} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: PoolConnection) => {
    return connection.query('call read_users()').then(result => [0]);
}