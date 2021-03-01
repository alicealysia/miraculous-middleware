import authQuery from './auth'
import byId from './by-id'
import list from './list'
import skills from './skills'
import leave from './leave'
import availability from './availability'
import {getConnection} from '../../pool'
import {User} from '../../../../types'

export {authQuery, byId, list, skills, availability, leave}


export default async (userId?: number) => {
    const connection = await getConnection;
    if (!userId) {
        const user = await list(connection);
        connection.release();
        return user;
    }
    const user: User = await byId(connection, userId);
    connection.release();
    return user;
}

export const auth = async (email: string, password: string) => {
    const connection = await getConnection;
    const user = await authQuery(connection, email, password);
    connection.release();
    return user;
}
