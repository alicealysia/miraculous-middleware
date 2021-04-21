import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Interface} from '../../../library/typeorm'
import Closure from '../../../library/typeorm/entity/closure'

export default async (request: Request<any, any, {closure: Interface.Closure.Insert}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).create(Resource.closure).id(projectId);
        const closure = {...request.body.closure, projectId};
        await new typeorm(Closure).create(filter(closure));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}