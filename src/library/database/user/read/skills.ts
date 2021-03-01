import {getConnection} from '../../pool'

export default async () => {
    const connection = await getConnection;
    const skillList = await connection.query('read_skills()').then(value => value[0]);
    connection.release();
    return skillList;
}
