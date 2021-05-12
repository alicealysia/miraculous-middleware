import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import Closure from '../../../library/typeorm/entity/closure'

export default async (request: Request<any, any, any, {id?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.closure).id(request.query.id);
            const closure = await new typeorm(Closure).findOne(request.query.id);
            return response.json(filter.filter(closure));
        }
        const closures = await new typeorm(Closure).find();
        const filtered = await new accessControl(request.User).read(Resource.closure).list();
        return response.json(filtered);
    } catch (err) {
        return next(err);
    }
}
