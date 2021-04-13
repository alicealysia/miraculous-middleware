import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../../library'
import {getConnection} from '../../../../library/typeorm'
import { AccessControl, Entity } from '../../../../types';
import {DeepPartial} from 'typeorm';

export default async (request: Request<any, any, DeepPartial<Entity.XeroLink>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.billing).id(request.query.id);
        const filtered = filter(request.body);
        const res = await getConnection().then(conn => conn.createQueryBuilder().relation(Entity.Project, 'invoices').of(request.query.id).add(filtered));
        return response.json(res);
    } catch (err) {
        return next(err);
    }
}
