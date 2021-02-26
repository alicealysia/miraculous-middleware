import {compare} from 'bcrypt'

import byId from './by-id'
import {getConnection} from '../../pool'

export default async (email: string, password: string) => {
    const connection = await getConnection;
    const {id, userHash} = await connection.query('call read_user_hash(?)', email).then(result => result[0][0]);
    const legitValue = await compare(password, userHash);
    if (legitValue) {
        return byId(id);
    }
    connection.release();
    return new Error('auth failure');
}