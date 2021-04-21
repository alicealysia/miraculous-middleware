import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Interface} from '../../../library/typeorm'
import {Material} from '../../../library/typeorm/entity/project'

export default async (request: Request<any, any, Interface.Material.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.material);
        const material = request.body;
        const id = await new typeorm(Material).create(filter(material));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
