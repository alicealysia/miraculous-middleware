import {PoolConnection} from 'promise-mysql'
import {Skill} from '../../../../types'

export default async (connection: PoolConnection, userId: number, skills: Skill[]) => {
    const skillQueries = skills.map(skill => connection.query('call user_assign_skill(?, ?)', [userId, skill.id]));
    return Promise.all(skillQueries);
}
