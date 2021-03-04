import {Pool} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: Pool) => {
    return connection.query('call read_users()').then(result => result[0] as User[]);
}