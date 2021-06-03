import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { Task } from '../../../library/typeorm/entity/task'
import { Resource } from '../../../types';

export default async (request: Request<any, any, DeepPartial<Task>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.task).id(taskId);
        const task = {...request.body, id: taskId};
        await new typeorm(Task).update(filter.filter(task), taskId);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}