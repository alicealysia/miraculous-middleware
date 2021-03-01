import {PoolConnection} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: PoolConnection) => {
    return connection.query('call read_users()').then(result => result[0] as User[]);
}