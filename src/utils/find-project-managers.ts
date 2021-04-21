import { In } from 'typeorm';
import {typeorm} from '../library'
import {User} from '../library/typeorm/entity/user'

export default async () => {
    const connection = new typeorm(User);
    return connection.find({
        where: {
            accessRights: In(['projectManager'])
        }
    });
}