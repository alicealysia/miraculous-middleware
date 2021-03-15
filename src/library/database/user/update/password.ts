import {Pool} from 'promise-mysql'
import {hash} from 'bcrypt'

export default async (connection: Pool, userId: number, password: string) => {
    const userHash = await hash(password, 12);
    return connection.query('call user_update_password(?, ?)', [userId, userHash]);
}
