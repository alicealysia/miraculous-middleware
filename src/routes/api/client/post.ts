import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import {Permission} from 'accesscontrol'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, Interface.Client.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.client);
        const client = request.body;
        const id = await new typeorm(Entity.Client).create(filter(client));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
