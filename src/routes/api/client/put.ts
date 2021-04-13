import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, DeepPartial<Entity.Client>, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const clientId = request.query.id;
        const filter = await new accessControl(request.User).update(AccessControl.Resource.client).id(clientId);
        const client = {...request.body, id: clientId};
        await new typeorm(Entity.Client).update(filter(client));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}