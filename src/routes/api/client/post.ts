import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import {Permission} from 'accesscontrol'
import { Resource} from '../../../types';
import {Interface} from '../../../library/typeorm'
import {Client} from '../../../library/typeorm/entity/client'

export default async (request: Request<any, any, Interface.Client.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.client);
        const client = request.body;
        const id = await new typeorm(Client).create(filter.filter(client));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
