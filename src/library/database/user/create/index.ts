import hours from './hours'
import details from './details'
import leaveQuery from './leave'
import {skill as updateSkill, wwvp as updateWWVP} from '../update'
import {getConnection} from '../../pool'
import {InsertUser, Leave} from '../../../../types'
import {hash} from 'bcrypt'

export { create, assign, leaveQuery, hours, details }

const create = async (user: InsertUser, password: string) => {
    const userHash = await hash(password, 12);
    const connection = await getConnection;
    const userId = await details(connection, user, userHash);
    if (user.skills) {
        await updateSkill(connection, userId, user.skills);
    }
    if (user.availability) {
        await hours(connection, userId, user.availability);
    }
    if (user.WWVPno && user.WWVPexp) {
        await updateWWVP(connection, userId, user.WWVPno, user.WWVPexp);
    }
    connection.release();
}

const leave = async(leave: Leave, userId: number) => {
    const connection = await getConnection;
    await leaveQuery(connection, userId, leave);
    connection.release();
}

const assign = {leave}
