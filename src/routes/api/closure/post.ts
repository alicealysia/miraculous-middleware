import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, {closure: Interface.Closure.Insert}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).create(AccessControl.Resource.closure).id(projectId);
        const closure = {...request.body.closure, projectId};
        await new typeorm(Entity.Closure).create(filter(closure));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}