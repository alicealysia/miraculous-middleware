import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import {idInit} from '../../../library/access-control'
import { Resource, InsertTask } from '../../../types';

export default async (request: Request<any, any, InsertTask, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.task).id(request.query.id);
        const task: InsertTask = {...request.body, assignment: request.query.id};
        await database.task.create(filter(task));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
