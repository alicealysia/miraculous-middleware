import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity } from '../../../types';

export default async (request: Request<any, any, any, {taskId?: number, userId?: number, projectId?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.taskId) {
            const filter = await new accessControl(request.User).read(AccessControl.Resource.task).id(request.query.taskId);
            const task = await new typeorm(Entity.Task).findOne(request.query.taskId);
            return response.json(filter(task));
        }
        const tasks = await new accessControl(request.User).read(AccessControl.Resource.task).list();
        let filteredTasks = tasks;
        if (request.query.userId) {
            filteredTasks = tasks.filter(task => task.user.id === request.query.userId);
        }
        if (request.query.projectId) {
            filteredTasks = filteredTasks.filter(task => task.project.id === request.query.projectId)
        }
        return response.json(filteredTasks);
        
    } catch (err) {
        return next(err);
    }
}
