import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, Note } from '../../../../types';

export default async (request: Request<any, any, {id?: number, actualHours: number, actualTravel: number, note: Note}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const taskId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.task).id(taskId);
        const task = filter({id: taskId, ...request.body});
        await database.task.update.continueTask(task.id, task.actualHours, task.actualTravel, task.note);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}