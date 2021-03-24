import hours from './hours'
import details from './details'
import leaveQuery from './leave'
import {skill as updateSkill, wwvp as updateWWVP, passwordQuery} from '../update'
import {getPool} from '../../pool'
import {InsertUser, Leave} from '../../../../types'
import {hash} from 'bcrypt'

export { create, assign, leaveQuery, hours, details }

const create = async (user: InsertUser, password?: string) => {

    const connection = await getPool();
    const userId = await details(connection, user);
    if (password) {
        const userHash = await hash(password, 12);
        await passwordQuery(connection, userId, userHash);
    }
    if (user.skills) {
        await updateSkill(connection, userId, user.skills);
    }
    if (user.availability) {
        await hours(connection, userId, user.availability);
    }
    if (user.WWVPno && user.WWVPexp) {
        await updateWWVP(connection, userId, user.WWVPno, user.WWVPexp);
    }
}

const leave = async(leave: Leave, userId: number) => {
    const connection = await getPool();
    return leaveQuery(connection, userId, leave);
}

const assign = {leave}
