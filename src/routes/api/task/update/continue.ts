import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, Note, ContinueTask } from '../../../../types';

export default async (request: Request<any, any, {id?: number, hours: number, travel: number, note: Note}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.task).id(taskId);
        const task = filter({id: taskId, ...request.body}) as ContinueTask;
        await database.task.update.continueTask(task.id, task.hours, task.travel, task.note);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}