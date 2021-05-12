import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Referral } from '../../../library/typeorm/entity/referral'

export default async (request: Request<any, any, any, {referralId?: number, clientId?: number}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.referralId) {
            const filter = await new accessControl(request.User).read(Resource.referral).id(request.query.referralId);
            const referral = await new typeorm(Referral).findOne(request.query.referralId);
            return response.json(filter.filter(referral));
        }
        if (!request.query.clientId) {
            throw new Error('no referral or client specified');
        }
        const referrals = await new accessControl(request.User).read(Resource.referral).list();
        const filteredReferrals = referrals.filter(referral => referral.client.id === request.query.clientId);
        return response.json(filteredReferrals);
        
    } catch (err) {
        return next(err);
    }
}
