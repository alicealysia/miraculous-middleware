import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import {Permission} from 'accesscontrol'
import { Resource, InsertClient } from '../../../types';

export default async (request: Request<any, any, InsertClient, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.client) as Permission;
        const client = request.body;
        const id = await database.client.create(filter.filter(client));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
