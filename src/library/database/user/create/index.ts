import hours from './hours'
import details from './details'
import leaveQuery from './leave'
import skill from './skill'
import {skill as updateSkill, wwvp as updateWWVP} from '../update'
import {getConnection} from '../../pool'
import {User, Leave} from '../../../../types'
import {hash} from 'bcrypt'

export { skill, leaveQuery, hours, details }

export default async (user: User, password: string) => {
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

export const submitLeave = async(leave: Leave, userId: number) => {
    const connection = await getConnection;
    await leaveQuery(connection, userId, leave);
    connection.release();
}
