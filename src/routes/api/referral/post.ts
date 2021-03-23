import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, Referral } from '../../../types';

export default async (request: Request<any, any, Referral, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.referral).id(request.query.id);
        const referral = request.body;
        await database.referral.create(request.query.id, filter(referral));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
