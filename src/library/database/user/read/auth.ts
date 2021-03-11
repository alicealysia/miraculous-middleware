import {compare} from 'bcrypt'
import {Pool} from 'promise-mysql'
import byId from './by-id'

export default async (connection: Pool, email: string, password: string) => {
    const {id, userHash} = await connection.query('call read_user_hash(?)', email).then(result => result[0][0]);
    const legitValue = await compare(password, userHash);
    if (legitValue) {
        return byId(connection, id);
    }
    throw new Error('incorrect password');
}