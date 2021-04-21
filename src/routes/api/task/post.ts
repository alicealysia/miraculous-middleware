import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, Interface.Task.Insert, {projectId: number, userId: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.task).id(request.query.projectId);
        const project = await new typeorm(Entity.Project).findOne(request.query.projectId);
        const user = await new typeorm(Entity.User).findOne(request.query.userId);
        const task = await new typeorm(Entity.Task).create(filter({...request.body, project, user}));
        return response.json(task);
    } catch (err) {
        return next(err);
    }
}
