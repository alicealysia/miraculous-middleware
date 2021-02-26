import {PoolConnection} from 'promise-mysql';
import {Availability} from '../../../../types';

export default async (connection: PoolConnection, userId: number, availability: Availability[]) => {
    await connection.beginTransaction();
    const queries = availability.map(workday => connection.query('call user_create_availability(?, ?, ?, ?)', [userId, workday.workDay, workday.startTime, workday.endTime]));
    await Promise.all(queries).catch(err => connection.rollback());
    await connection.commit();
}