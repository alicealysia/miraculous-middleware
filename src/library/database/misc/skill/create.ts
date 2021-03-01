import {getPool} from '../../pool'

export default async (skillName: string) => {
    const connection = await getPool();
    connection.query('call create_user_skill(?)', skillName);
}