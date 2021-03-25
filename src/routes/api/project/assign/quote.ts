import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {quote: string}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.billing).id(request.query.id);
        const quote = filter(request.body.quote);
        await database.project.assign.quote(request.query.id, quote);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
