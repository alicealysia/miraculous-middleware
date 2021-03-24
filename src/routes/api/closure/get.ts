import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {id?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.closure).id(request.query.id);
            const closure = await database.closure.read(request.query.id);
            return response.json(filter(closure));
        }
        const closures = await database.closure.read();
        const filtered = await new accessControl(request.User).read(Resource.closure).list(closures);
        return response.json(filtered);
    } catch (err) {
        return next(err);
    }
}
