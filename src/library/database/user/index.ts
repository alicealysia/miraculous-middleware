import {hash} from 'bcrypt'

import createQueries from './create'
import readQueries from './read'
import updateQueries from './update'
import delQueries from './delete'

import {User} from '../../../types'
import {getConnection} from '../pool'
import {isBefore} from 'date-fns'

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
    const originalUser = await readQueries.byId(connection, user.id);
    if (user.availability) {
        const availability = user.availability;
        await createQueries.hours(connection, user.id, availability);
        if (originalUser.availability) {
            const deletes = originalUser.availability.filter(value => !availability.includes(value));
            await delQueries.availability(connection, user.id, deletes);
        }
    }
    if (user.skills) {
        const skills = user.skills;
        const deletes = originalUser.skills?.filter(value => !skills.includes(value));
        const inserts = skills.filter(value => !originalUser.skills?.includes(value));
        await updateQueries.skill(connection, user.id, inserts);
        if (deletes) {
            await delQueries.skill(connection, user.id, deletes);
        }
    }
    if (user.leave) {
        const leave = user.leave;
        const inserts = leave.filter(value => originalUser.leave?.includes(value));
        const deletes = originalUser.leave?.filter(value => isBefore(value.endDate, new Date()));
        if (deletes) {
            await delQueries.leave(connection, deletes);
        }
        await createQueries.leave(connection, user.id, inserts);
    }
    connection.release();
}

const read = async (userId?: number) => {
    const connection = await getConnection;
    if (!userId) {
        return readQueries.list(connection);
    }
    let user = await readQueries.byId(connection, userId);
    const deletes = user.leave?.filter(value => isBefore(value.endDate, new Date()));
    if (deletes) {
        await delQueries.leave(connection, deletes);
        user.leave = user.leave?.filter(value => !deletes.includes(value));
        connection.release();
        return user
    }
    connection.release();
    return user;
}

const auth = async (email: string, password: string) => {
    const connection = await getConnection;
    const userId = await readQueries.auth(connection, email, password);
    connection.release();
    if (userId) {
        return read(userId);
    }
    return new Error('user inAuthentic');
}

export default {create, update, read, auth, createQueries, updateQueries, delQueries}
