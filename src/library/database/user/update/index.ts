import wwvp from './wwvp';
import passwordQuery from './password';
import skill from './skill'
import details from './details'

import {getConnection} from '../../pool'
import {User} from '../../../../types'
import del from '../delete'
import hours from '../create/hours'

export default async(user:User) => {
    if (!user.id) {
        throw new Error('no id found');
    }
    const connection = await getConnection;
    await details(connection, user);
    if (user.WWVPno && user.WWVPexp) {
        await wwvp(connection, user.id, user.WWVPno, user.WWVPexp);
    }
    if (user.availability) {
        await del.availability(connection, user.id);
        await hours(connection, user.id, user.availability);
    }
    if (user.skills) {
        await del.skill(connection, user.id);
        await skill(connection, user.id, user.skills);
    }
    connection.release();
}

export const resetPassword = async(userId: number, password: string) => {
    const connection = await getConnection;
    await passwordQuery(connection, userId, password);
    connection.release();
}

export {wwvp, passwordQuery, skill, details}
