import {PoolConnection} from 'promise-mysql'
import {InsertUser} from '../../../../types'


export default async (connection: PoolConnection, user: InsertUser, userHash: string) => {
    const accessRights = user.accessRights.join(',');
return connection.query('call create_user(?, ?, ?, ?, ?, ?, ?, ?)', [
    user.fullName,
    user.DOB,
    user.email,
    user.address,
    user.phone,
    user.hourlyRate,
    accessRights,
    userHash
]).then(result => {
    console.log(result[0][0].id);
    return result[0][0].id}
)};