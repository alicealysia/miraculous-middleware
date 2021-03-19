import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import {Permission} from 'accesscontrol'
import { Resource, InsertProject } from '../../../types';

export default async (request: Request<any, any, InsertProject, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.project) as Permission;
        const project = request.body;
        const id = await database.project.create(filter.filter(project));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
