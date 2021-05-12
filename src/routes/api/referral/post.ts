import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Client } from '../../../library/typeorm/entity/client'
import { Referral } from '../../../library/typeorm/entity/referral'
import {Interface} from '../../../library/typeorm'

export default async (request: Request<any, any, Interface.Referral.Insert, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.referral).id(request.query.id);
        const parent = await new typeorm(Client).findOne(request.query.id);
        const res = await new typeorm(Referral).create({...filter.filter(request.body), client: parent})
        return response.json(res);
    } catch (err) {
        return next(err);
    }
}
