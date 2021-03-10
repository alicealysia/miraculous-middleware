import {Pool} from 'promise-mysql'
import {UninitUser, User} from '../../../../types'

export default async (connection: Pool) => {
    return connection.query('call read_users()').then(result => result[0].map((user: UninitUser) => ({
        ...user, accessRights: user.accessRights.split(',')
    })) as User[]);
}