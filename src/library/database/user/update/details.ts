import {Pool} from 'promise-mysql'
import {User} from '../../../../types'

export default async (connection: Pool, user: User) => {
    let accessRights = user.accessRights.join(',');
    await connection.query('call update_user(?, ?, ?, ?, ?, ?, ?, ?)', [user.id, user.fullName, user.DOB, user.email, user.address, user.phone, user.hourlyRate, accessRights]);
}
