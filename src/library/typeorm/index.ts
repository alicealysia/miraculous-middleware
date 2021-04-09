import "reflect-metadata";
import {createConnection, Connection, ConnectionOptions} from 'typeorm'
import {compare} from 'bcrypt'
import entities, {User} from './entity'

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

export const auth = async (email: string, password: string) => {
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOneOrFail({relations: ['availability', 'leave', 'skills', 'tasks'], where: {email}});
    const valid = await compare(password, user.userHash);
    if (valid) {
        return user;
    }
    throw new Error('signin failure');
}

export * from './entity'