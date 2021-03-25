import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, Client } from '../../../types';

export default async (request: Request<any, any, Client, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const clientId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.client).id(clientId);
        const client = {...request.body, id: clientId};
        await database.client.update(filter(client));
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}