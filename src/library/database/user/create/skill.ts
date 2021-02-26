import {PoolConnection} from 'promise-mysql'

export default async (connection: PoolConnection, skillName: string) => connection.query('call create_user_skill(?)', skillName);