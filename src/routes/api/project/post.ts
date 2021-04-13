import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, Interface.Project.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.project);
        const project = request.body;
        const id = await new typeorm(Entity.Project).create(filter(project));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
