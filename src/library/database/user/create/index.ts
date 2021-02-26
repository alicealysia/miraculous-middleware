import {getConnection} from '../../pool'
import {User} from '../../../../types'
import {hash} from 'bcrypt'
import hours from './hours'
import insert from './insert'
import leave from './leave'
import skill from './skill'

const completeUser = async (user: User, password: string) => {
    const userHash = await hash(password, 12);
    const connection = await getConnection;
    const insertSafeUser = {
        fullName: user.fullName,
        DOB: user.DOB,
        email: user.email,
        address: user.address,
        phone: user.phone,
        hourlyRate: user.hourlyRate,
        accessRights: user.accessRights,
        userHash
    }

    const userId = await insert(connection, insertSafeUser);
    const skills = user.skills?.map(skill => connection.query('call user_assign_skill(?, ?)', [userId, skill.id]));

    if (skills) {
        await Promise.all(skills);
    }
    if (user.availability) {
        await hours(connection, userId, user.availability);
    }
    if (user.WWVPno && user.WWVPexp) {
        await connection.query('call user_update_WWVP(?, ?, ?)', [userId, user.WWVPno, user.WWVPexp]);
    }

    connection.release();
}

export default { completeUser, newSkill: skill, leave, hours, userInsertQuery: insert }
