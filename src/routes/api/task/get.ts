import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {taskId?: number, assignmentId?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.taskId) {
            const filter = await new accessControl(request.User).read(Resource.task).id(request.query.taskId);
            const task = await database.task.read.one(request.query.taskId);
            return response.json(filter(task));
        }
        if (!request.query.assignmentId) {
            throw new Error('no referral or client specified');
        }
        const tasks = await database.task.read.list(request.query.assignmentId);
        const filteredTasks = await new accessControl(request.User).read(Resource.task).list(tasks);
        return response.json(filteredTasks);
        
    } catch (err) {
        return next(err);
    }
}
