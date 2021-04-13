import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity } from '../../../types';

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(AccessControl.Resource.project).id(request.query.id);
            const project = await new typeorm(Entity.Project).findOne(request.query.id);
            return response.json(filter(project));
        }
        const filteredProjects = await new accessControl(request.User).read(AccessControl.Resource.project).list();
        return response.json(filteredProjects);
        
    } catch (err) {
        return next(err);
    }
}
