import {Request, Response, NextFunction} from 'express'
import {accessControl} from '../../../../library'
import { AccessControl, Entity } from '../../../../types';
import {getConnection} from '../../../../library/typeorm'
import {DeepPartial} from 'typeorm';

export default async (request: Request<any, any, DeepPartial<Entity.Material>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.material);
        const material = filter(request.body);
        const res = await getConnection().then(conn => conn.createQueryBuilder().relation(Entity.Project, 'materialsEstimate').of(request.query.id).add(material));
        return response.json(res);
    } catch (err) {
        return next(err);
    }
}
