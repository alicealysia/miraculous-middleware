import "reflect-metadata";
import {createConnection, Connection, ConnectionOptions, EntityTarget, DeepPartial, FindManyOptions, FindOneOptions, ObjectID, FindConditions} from 'typeorm'
import {compare} from 'bcrypt'
import Entity, {enumArray} from './entity'
import {IndexableEntity} from '../../types'
import Interface from './interface'
import Enum from './enum'
let connection: Connection;

const config : ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: enumArray,
    synchronize: true,
    logging: false
}

const getConnection = async () => {
    if (connection) {
        return connection;
    }
    connection = await createConnection(config);
    return connection;
}

class typeorm <T> {
    public _target: EntityTarget<T>;
    constructor (target: EntityTarget<T>) {
        this._target = target;
    }
    public async getRepository (target?: EntityTarget<T>) {
        if (target) {
            this._target = target;
        }
        const connection = await getConnection();
        return connection.getRepository(this._target);
    }
    public async create (row: DeepPartial<T>) {
        const repo = await getConnection().then(con => con.getRepository(this._target));
        const entity = await repo.save(row) as T;
        return entity;
    }
    public async update (row: DeepPartial<T>) {
        const repo = await getConnection().then(con => con.getRepository(this._target));
        const entity = await repo.save(row);
        return entity;
    }
    public async auth (email: string, password: string) {
        const connection = await getConnection();
        const user = await connection.getRepository(Entity.User).findOneOrFail({relations: ['availability', 'leave', 'skills', 'tasks'], where: {email}});
        const valid = await compare(password, user.userHash);
        if (valid) {
            return user;
        }
        throw new Error('signin failure');
    }
    public async find (options?: FindManyOptions) {
        const repo = await getConnection().then(con => con.getRepository(this._target));
        return repo.find(options);
    }
    public async findOne (id: string | number | Date ): Promise<T>;
    public async findOne (options: FindOneOptions<T>) : Promise<T>;
    public async findOne (id: string | number | Date , options: FindOneOptions<T>): Promise<T>;
    public async findOne (optionsOrId: string | number | Date | FindOneOptions<T>, options?: FindOneOptions<T>) {
        const repo = await getConnection().then(con => con.getRepository(this._target));
        if (bypassIdCheck<T>(optionsOrId)) {
            return repo.findOneOrFail(optionsOrId);
        }
        return repo.findOneOrFail(optionsOrId, options);
    }
    public async del (criteria: string | number | Date | ObjectID | string[] | number[] | Date[] | ObjectID[] | FindConditions<T>) {
        const repo = await getConnection().then(con => con.getRepository(this._target));
        return repo.delete(criteria);
    }
}

function bypassIdCheck <T>(optionsOrId: string | number | Date | FindOneOptions<T>): optionsOrId is FindOneOptions<T> {
    return typeof optionsOrId === 'object';
}

export default typeorm

export {
    Entity,
    Enum,
    Interface,
    getConnection
}