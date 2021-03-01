import {hash} from 'bcrypt'
import createQueries from './create'
import readQueries from './read'
import updateQueries from './update'
import delQueries from './delete'
import {Leave, User} from '../../../types'
import {getConnection} from '../pool'

const create = async (user: User, password: string) => {
    const userHash = await hash(password, 12);
    const connection = await getConnection;
    const userId = await createQueries.details(connection, user, userHash);
    if (user.skills) {
        await updateQueries.skill(connection, userId, user.skills);
    }
    if (user.availability) {
        await createQueries.hours(connection, userId, user.availability);
    }
    if (user.WWVPno && user.WWVPexp) {
        await updateQueries.wwvp(connection, userId, user.WWVPno, user.WWVPexp);
    }
    connection.release();
}

const update = async(user:User) => {
    if (!user.id) {
        throw new Error('no id found');
    }
    const connection = await getConnection;
    await updateQueries.details(connection, user);
    if (user.WWVPno && user.WWVPexp) {
        await updateQueries.wwvp(connection, user.id, user.WWVPno, user.WWVPexp);
    }
    if (user.availability) {
        await delQueries.availability(connection, user.id);
        await createQueries.hours(connection, user.id, user.availability);
    }
    if (user.skills) {
        await delQueries.skill(connection, user.id);
        await updateQueries.skill(connection, user.id, user.skills);
    }
    connection.release();
}

const read = async (userId?: number) => {
    const connection = await getConnection;
    if (!userId) {
        const user = await readQueries.list(connection);
        connection.release();
        return user;
    }
    const user: User = await readQueries.byId(connection, userId);
    connection.release();
    return user;
}

const auth = async (email: string, password: string) => {
    const connection = await getConnection;
    const user = await readQueries.auth(connection, email, password);
    connection.release();
    return user;
}

const submitLeave = async(leave: Leave, userId: number) => {
    const connection = await getConnection;
    await createQueries.leave(connection, userId, leave);
    connection.release();
}

const resetPassword = async(userId: number, password: string) => {
    const connection = await getConnection;
    await updateQueries.password(connection, userId, password);
    connection.release();
}

export default {create, update, read, auth, submitLeave, resetPassword}
