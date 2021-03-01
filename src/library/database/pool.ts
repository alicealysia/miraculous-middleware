import mysql from 'promise-mysql';
import {PoolConfig} from 'promise-mysql';

let pool : mysql.Pool;

const config : PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
}

export const getPool = async () => {
    if (pool) {
        return pool;
    }
    pool = await mysql.createPool(config);
    return pool;
}

export const getConnection = getPool().then(pool => pool.getConnection());