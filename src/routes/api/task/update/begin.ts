import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, BeginTask } from '../../../../types';

export default async (request: Request<any, any, BeginTask, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.task).id(taskId);
        const task: BeginTask = {...request.body, id: taskId};
        await database.task.update.begin(filter(task) as BeginTask);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}