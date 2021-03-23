import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.project).id(request.query.id);
            const project = await database.project.read.one(request.query.id);
            return response.json(filter(project));
        }
        const projects = await database.project.read.list();
        const filteredProjects = await new accessControl(request.User).read(Resource.project).list(projects);
        return response.json(filteredProjects);
        
    } catch (err) {
        return next(err);
    }
}
