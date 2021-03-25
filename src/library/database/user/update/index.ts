import wwvp from './wwvp';
import passwordQuery from './password';
import skill from './skill'
import info from './details'
import setMSAL from './msal'

import {getPool} from '../../pool'
import {User} from '../../../../types'
import del from '../delete'
import hours from '../create/hours'
import setXero from './xero';

const details = async(user:User) => {
    if (!user.id) {
        throw new Error('no id found');
    }
    const connection = await getPool();
    await info(connection, user);
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

const password = async(userId: number, password: string) => {
    const connection = await getPool();
    await passwordQuery(connection, userId, password);
    connection.release();
}

const msal = async(userId: number, msalToken: string) => {
    const connection = await getPool();
    await setMSAL(connection, userId, msalToken);
}

const xero = async(userId: number, xeroToken: string) => {
    const connection = await getPool();
    await setXero(connection, userId, xeroToken);
}

export default {details, password, msal, xero}

export {wwvp, passwordQuery, skill, info as details}
