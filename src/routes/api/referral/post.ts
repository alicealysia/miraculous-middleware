import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import {idInit} from '../../../library/access-control'
import { Resource, Referral } from '../../../types';

export default async (request: Request<any, any, Referral, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const createPerms = new accessControl(request.User).create(Resource.referral) as idInit;
        const filter = await createPerms.id(request.query.id);
        const referral = request.body;
        await database.referral.create(request.query.id, filter.filter(referral));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
