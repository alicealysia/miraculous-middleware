import authQuery from './auth'
import byId from './by-id'
import list from './list'
import leave from './leave'
import availability from './availability'
import {getPool} from '../../pool'
import {User} from '../../../../types'

export {authQuery, byId, list, availability, leave}


export const readOne = async (userId: number) => {
    const connection = await getPool();
    const user: User = await byId(connection, userId);
    connection.release();
    return user;
}

export const readList = async() => getPool();

export const auth = async (email: string, password: string) => {
    const connection = await getPool();
    const user = await authQuery(connection, email, password);
    connection.release();
    return user;
}
