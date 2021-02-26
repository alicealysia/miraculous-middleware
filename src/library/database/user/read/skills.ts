import {getConnection} from '../../pool'

export default async () => {
    const connection = await getConnection;
    const skillList = await connection.query('read_skills()');
    connection.release();
    return skillList;
}
