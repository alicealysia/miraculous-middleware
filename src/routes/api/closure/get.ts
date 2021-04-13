import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity} from '../../../types';

export default async (request: Request<any, any, any, {id?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(AccessControl.Resource.closure).id(request.query.id);
            const closure = await new typeorm(Entity.Closure).findOne(request.query.id);
            return response.json(filter(closure));
        }
        const closures = await new typeorm(Entity.Closure).find();
        const filtered = await new accessControl(request.User).read(AccessControl.Resource.closure).list();
        return response.json(filtered);
    } catch (err) {
        return next(err);
    }
}
