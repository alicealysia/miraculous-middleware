import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, {cost: number}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        await new accessControl(request.User).update(Resource.material).id(request.query.id);
        await database.material.update(request.query.id, request.body.cost);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}