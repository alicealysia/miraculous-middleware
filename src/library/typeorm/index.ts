import "reflect-metadata";
import {createConnection, Connection, ConnectionOptions} from 'typeorm'
import entities from './entity'

let connection: Connection;

const config : ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    synchronize: true,
    logging: false
}

export const getConnection = async () => {
    if (connection) {
        return connection;
    }
    connection = await createConnection(config);
    return connection;
}