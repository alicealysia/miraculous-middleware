import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, CompleteTask } from '../../../../types';

export default async (request: Request<any, any, CompleteTask, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.task).id(taskId);
        const task = {...request.body, id: taskId};
        await database.task.update.complete(filter(task) as CompleteTask);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}