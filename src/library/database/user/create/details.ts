import {PoolConnection} from 'promise-mysql'
import {User} from '../../../../types'


export default async (connection: PoolConnection, user: User, userHash: string) => connection.query('call create_user(?, ?, ?, ?, ?, ?, ?, ?)', [
    user.fullName,
    user.DOB,
    user.email,
    user.address,
    user.phone,
    user.hourlyRate,
    user.accessRights,
    userHash
]).then(result => {
    console.log(result[0][0].id);
    return result[0][0].id}
);