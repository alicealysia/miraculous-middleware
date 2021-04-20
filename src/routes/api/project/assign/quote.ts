import {Request, Response, NextFunction} from 'express'
import {accessControl} from '../../../../library'
import { AccessControl, Entity} from '../../../../types';
import { getConnection } from '../../../../library/typeorm'
import {DeepPartial} from 'typeorm'

export default async (request: Request<any, any, DeepPartial<Entity.XeroLink>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.billing).id(request.query.id);
        const quote = filter(request.body);
        const res = await getConnection().then(conn => conn.createQueryBuilder().relation(Entity.Project, 'quotes').of(request.query.id).add(quote));
        return response.json(res);
    } catch (err) {
        return next(err);
    }
}
