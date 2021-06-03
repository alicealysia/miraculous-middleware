import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Project} from '../../../library/typeorm/entity/project'

export default async (request: Request<any, any, DeepPartial<Project>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.project).id(projectId);
        const project = request.body;
        await new typeorm(Project).update(filter.filter(project), projectId);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}