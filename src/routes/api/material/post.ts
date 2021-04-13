import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Entity, Interface } from '../../../types';

export default async (request: Request<any, any, Interface.Material.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.material);
        const material = request.body;
        const id = await new typeorm(Entity.Material).create(filter(material));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
