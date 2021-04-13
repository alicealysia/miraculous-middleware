import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity } from '../../../types';
import {DeepPartial} from 'typeorm'

export default async (request: Request<any, any, DeepPartial<Entity.Material>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        await new accessControl(request.User).update(AccessControl.Resource.material).id(request.query.id);
        await new typeorm(Entity.Material).update({id: request.query.id, ...request.body});
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}