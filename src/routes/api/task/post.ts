import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import {idInit} from '../../../library/access-control'
import { Resource, Task } from '../../../types';

export default async (request: Request<any, any, Task, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const createPerms = new accessControl(request.User).create(Resource.task) as idInit;
        const filter = await createPerms.id(request.query.id);
        const task: Task = {...request.body, assignment: request.query.id};
        await database.task.create(filter.filter(task));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
