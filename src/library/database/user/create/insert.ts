import {PoolConnection} from 'promise-mysql'

interface InsertSafeUser {
    fullName: string;
    DOB: Date;
    email: string;
    address: string;
    phone: string;
    hourlyRate: number;
    accessRights: string;
    userHash: string;
}

export default async (connection: PoolConnection, user: InsertSafeUser) => connection.query('call create_user(?, ?, ?, ?, ?, ?, ?, ?)', [
    user.fullName,
    user.DOB,
    user.email,
    user.address,
    user.phone,
    user.hourlyRate,
    user.accessRights,
    user.userHash
]).then(result => {
    console.log(result[0][0].id);
    return result[0][0].id}
);