import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, InsertClosure } from '../../../types';

export default async (request: Request<any, any, InsertClosure, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).create(Resource.closure).id(projectId);
        const closure = {...request.body, projectId};
        await database.client.update(filter(closure));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}