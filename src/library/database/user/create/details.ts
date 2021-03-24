import {Pool} from 'promise-mysql'
import {InsertUser} from '../../../../types'


export default async (connection: Pool, user: InsertUser) => {
    const accessRights = user.accessRights.join(',');
return connection.query('call create_user(?, ?, ?, ?, ?, ?, ?)', [
    user.fullName,
    user.DOB,
    user.email,
    user.address,
    user.phone,
    user.hourlyRate,
    accessRights
]).then(result => {
    console.log(result[0][0].id);
    return result[0][0].id}
)};