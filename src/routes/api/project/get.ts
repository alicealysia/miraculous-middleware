import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Project} from '../../../library/typeorm/entity/project'

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.project).id(request.query.id);
            const project = await new typeorm(Project).findOne(request.query.id, {relations: ['client', 'materials', 'materialsEstimate']});
            return response.json(filter.filter(project));
        }
        const filteredProjects = await new accessControl(request.User).read(Resource.project).list();
        return response.json(filteredProjects);
        
    } catch (err) {
        return next(err);
    }
}
