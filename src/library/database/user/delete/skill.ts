import { formatWithOptions } from 'date-fns/fp';
import {PoolConnection} from 'promise-mysql'
import {Skill} from '../../../../types'

export default async (connection: PoolConnection, userId: number) => {
    connection.query('call user_delete_skill(?)', userId);
}
