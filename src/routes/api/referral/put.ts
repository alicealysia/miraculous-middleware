import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, Referral } from '../../../types';

export default async (request: Request<any, any, Referral, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const referralId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.referral).id(referralId);
        const referral = {...request.body, id: referralId};
        await database.referral.update(filter.filter(referral));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}