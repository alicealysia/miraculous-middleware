import {accessControl, typeorm} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { User } from '../../../library/typeorm/entity/user'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, any, {id?: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    if (uid) {
        const filter = await new accessControl(request.User).read(Resource.user).id(uid);
        const user = await new typeorm(User).findOne(uid);
        return response.json(filter(user));
    }
    const filteredUsers = await new accessControl(request.User).read(Resource.user).list();
    return response.json(filteredUsers);

    } catch(err) {
        next(err);
    }

}
