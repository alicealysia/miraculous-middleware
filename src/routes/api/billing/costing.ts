import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).read(Resource.billing).id(request.query.id);
        const costing = await database.billing.costings(request.query.id);
        return response.json(filter(costing));
    } catch (err) {
        return next(err);
    }
}
