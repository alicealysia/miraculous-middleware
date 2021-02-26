import { formatWithOptions } from 'date-fns/fp';
import {PoolConnection} from 'promise-mysql'
import {Skill} from '../../../../types'

export default async (connection: PoolConnection, userId: number, skill: Skill[]) => {
    const skills = skill.map(value => connection.query('call user_delete_skill(?, ?)', [userId, value.id]));
    return Promise.all(skills);
}
