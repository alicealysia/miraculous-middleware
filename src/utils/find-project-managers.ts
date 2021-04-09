import { In } from 'typeorm';
import {typeorm} from '../library'
import {Entity} from '../types'

export default async () => {
    const connection = await typeorm.getConnection();
    return connection.getRepository(Entity.User).find({
        where: {
            accessRights: In(['projectManager'])
        }
    });
}