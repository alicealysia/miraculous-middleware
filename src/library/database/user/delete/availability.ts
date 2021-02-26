import {PoolConnection} from 'promise-mysql'
import {Availability} from '../../../../types'

export default async (connection: PoolConnection, userId: number, availability: Availability[]) => {
    return availability.map(value => connection.query('call user_delete_availability(?, ?)', [userId, value.workDay]));
}
