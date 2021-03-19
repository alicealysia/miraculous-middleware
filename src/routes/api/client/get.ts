import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.client).id(request.query.id);
            const client = await database.client.read.one(request.query.id);
            return response.json(filter.filter(client));
        }
        const clients = await database.client.read.list();
        const filteredClients = await new accessControl(request.User).filterToOwned(clients);
        return response.json(filteredClients);
        
    } catch (err) {
        return next(err);
    }
}
