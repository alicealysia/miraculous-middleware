import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity, Interface } from '../../../types';

export default async (request: Request<any, any, Interface.Referral.Insert, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.referral).id(request.query.id);
        const parent = await new typeorm(Entity.Client).findOne(request.query.id);
        const res = await new typeorm(Entity.Referral).create({...filter(request.body), client: parent})
        return response.json(res);
    } catch (err) {
        return next(err);
    }
}
