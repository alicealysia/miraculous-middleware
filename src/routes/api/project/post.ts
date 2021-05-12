import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Interface} from '../../../library/typeorm'
import {Project} from '../../../library/typeorm/entity/project'

export default async (request: Request<any, any, Interface.Project.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.project);
        const project = request.body;
        const id = await new typeorm(Project).create(filter.filter(project));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
