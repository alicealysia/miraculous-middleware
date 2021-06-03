import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Material} from '../../../library/typeorm/entity/project'
import {DeepPartial} from 'typeorm'

export default async (request: Request<any, any, DeepPartial<Material>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        await new accessControl(request.User).update(Resource.material).id(request.query.id);
        await new typeorm(Material).update(request.body, request.query.id);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}