import {compare} from 'bcrypt'
import {PoolConnection} from 'promise-mysql'
import byId from './by-id'

export default async (connection: PoolConnection, email: string, password: string) => {
    const {id, userHash} = await connection.query('call read_user_hash(?)', email).then(result => result[0][0]);
    const legitValue = await compare(password, userHash);
    if (legitValue) {
        return byId(connection, id);
    }
    return new Error('incorrect User');
}