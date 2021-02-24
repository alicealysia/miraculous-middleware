import mysql from 'promise-mysql';

let pool : mysql.Pool;

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306
}

export const getPool = async () => {
    if (pool) {
        return pool;
    }
    pool = await mysql.createPool(config);
    return pool;
}