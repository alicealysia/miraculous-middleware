import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity } from '../../../types';
import {DeepPartial} from 'typeorm'

export default async (request: Request<any, any, DeepPartial<Entity.Referral>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const referralId = request.query.id;
        const filter = await new accessControl(request.User).update(AccessControl.Resource.referral).id(referralId);
        const referral = {...request.body, id: referralId};
        await new typeorm(Entity.Referral).update(filter(referral));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}