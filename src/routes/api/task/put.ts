import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, DeepPartial<Entity.Task>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(AccessControl.Resource.task).id(taskId);
        const task = {...request.body, id: taskId};
        await new typeorm(Entity.Task).update(filter(task));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}