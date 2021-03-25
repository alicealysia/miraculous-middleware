import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, InsertClosure } from '../../../types';

export default async (request: Request<any, any, {closure: InsertClosure, finalReport: string, closureDate: Date}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const projectId = request.query.id;
        const filter = await new accessControl(request.User).create(Resource.closure).id(projectId);
        const closure = {...request.body.closure, projectId};
        await database.closure.submit(filter(closure), request.body.finalReport, request.body.closureDate);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}