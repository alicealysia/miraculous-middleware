import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { Task } from '../../../library/typeorm/entity/task'

export default async (request: Request<any, any, any, {taskId?: number, userId?: number, projectId?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.taskId) {
            const filter = await new accessControl(request.User).read(Resource.task).id(request.query.taskId);
            const task = await new typeorm(Task).findOne(request.query.taskId);
            return response.json(filter.filter(task));
        }
        const tasks = await new accessControl(request.User).read(Resource.task).list();
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
