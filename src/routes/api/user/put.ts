import {accessControl, typeorm} from '../../../library'
import {AccessControl, Entity} from '../../../types'
import {DeepPartial} from 'typeorm'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, DeepPartial<Entity.User>, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(AccessControl.Resource.user).id(uid);
    const userObject = await new typeorm(Entity.User).update({...filter(request.body), id: request.query.id});
    return response.json(userObject);

    } catch(err) {
        next(err);
    }

}
