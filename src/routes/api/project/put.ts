import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, DeepPartial<Entity.Project>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).update(AccessControl.Resource.project).id(projectId);
        const project = {...request.body, id: projectId};
        await new typeorm(Entity.Project).update(filter(project));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}