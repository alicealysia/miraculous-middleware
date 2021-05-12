import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { Task } from '../../../library/typeorm/entity/task'
import { User } from '../../../library/typeorm/entity/user'
import { Project } from '../../../library/typeorm/entity/project'
export default async (request: Request<any, any, Interface.Task.Insert, {projectId: number, userId: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.task).id(request.query.projectId);
        const project = await new typeorm(Project).findOne(request.query.projectId);
        const user = await new typeorm(User).findOne(request.query.userId);
        const task = await new typeorm(Task).create(filter.filter({...request.body, project, user}));
        return response.json(task);
    } catch (err) {
        return next(err);
    }
}
