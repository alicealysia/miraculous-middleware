import { In } from 'typeorm';
import {typeorm} from '../library'
import {Entity} from '../types'

export default async () => {
    const connection = new typeorm(Entity.User);
    return connection.find({
        where: {
            accessRights: In(['projectManager'])
        }
    });
}