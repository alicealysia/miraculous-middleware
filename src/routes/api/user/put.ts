import {accessControl, typeorm} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { User } from '../../../library/typeorm/entity/user'
import {DeepPartial} from 'typeorm'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, DeepPartial<User>, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(Resource.user).id(uid);
    const userObject = await new typeorm(User).update({...filter.filter(request.body), id: request.query.id});
    return response.json(userObject);

    } catch(err) {
        next(err);
    }

}
