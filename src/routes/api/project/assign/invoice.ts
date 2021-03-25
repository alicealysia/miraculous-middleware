import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {invoice: string, amount: number}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.billing).id(request.query.id);
        const filtered = filter(request.body.invoice);
        await database.project.assign.invoice(request.query.id, filtered, request.body.amount);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
