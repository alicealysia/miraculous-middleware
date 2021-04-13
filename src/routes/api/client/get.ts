import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(AccessControl.Resource.client).id(request.query.id);
            const client = await new typeorm(Entity.Client).findOne(request.query.id);
            return response.json(filter(client));
        }
        const filteredClients = await new accessControl(request.User).read(AccessControl.Resource.client).list();
        return response.json(filteredClients);
        
    } catch (err) {
        return next(err);
    }
}
