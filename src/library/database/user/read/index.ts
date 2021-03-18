import authQuery from './auth'
import byId from './by-id'
import listQuery from './list'
import leave from './leave'
import availability from './availability'
import {getPool} from '../../pool'
import {User} from '../../../../types'

export {authQuery, byId, list, availability, leave}

const one = async (userId: number) => {
    const connection = await getPool();
    const user: User = await byId(connection, userId);
    return user;
}

const list = async() => getPool().then(pool => listQuery(pool));

const auth = async (email: string, password: string) => {
    const connection = await getPool();
    const user = await authQuery(connection, email, password);
    return user;
}

export default {one, list, auth}
