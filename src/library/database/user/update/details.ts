import {PoolConnection} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: PoolConnection, user: User) => {
    await connection.query('call update_user(?, ?, ?, ?, ?, ?, ?)', [user.id, user.fullName, user.DOB, user.email, user.address, user.phone, user.hourlyRate, user.accessRights]);
}
