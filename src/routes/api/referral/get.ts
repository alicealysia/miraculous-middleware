import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {referralId?: number, clientId?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.referralId) {
            const filter = await new accessControl(request.User).read(Resource.referral).id(request.query.referralId);
            const referral = await database.referral.read.one(request.query.referralId);
            return response.json(filter(referral));
        }
        if (!request.query.clientId) {
            throw new Error('no referral or client specified');
        }
        const referrals = await database.referral.read.list(request.query.clientId);
        const filteredReferrals = await new accessControl(request.User).filterToOwned(referrals);
        return response.json(filteredReferrals);
        
    } catch (err) {
        return next(err);
    }
}
