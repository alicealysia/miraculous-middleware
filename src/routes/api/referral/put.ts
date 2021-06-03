import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Referral } from '../../../library/typeorm/entity/referral'
import {DeepPartial} from 'typeorm'

export default async (request: Request<any, any, DeepPartial<Referral>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const referralId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.referral).id(referralId);
        const referral = request.body;
        await new typeorm(Referral).update(filter.filter(referral), referralId);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}