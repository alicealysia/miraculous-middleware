import {Pool} from 'promise-mysql';
import {Availability} from '../../../../types';

export default async (connection: Pool, userId: number, availability: Availability[]) => {
    return Promise.all(availability.map(workday => connection.query('call user_create_availability(?, ?, ?, ?)', [userId, workday.workDay, workday.startTime, workday.endTime])));
}