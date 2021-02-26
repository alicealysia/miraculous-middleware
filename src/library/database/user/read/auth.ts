import {compare} from 'bcrypt'
import byId from './by-id'
import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, email: string, password: string) => {
    const {id, userHash} = await connection.query('call read_user_hash(?)', email).then(result => result[0][0]);
    const legitValue = await compare(password, userHash);
    if (legitValue) {
        return id;
    }
    return undefined;
}