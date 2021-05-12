import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Client} from '../../../library/typeorm/entity/client'

export default async (request: Request<any, any, any, {id: number | undefined}>, response: Response, next: NextFunction) => {
    try {
        if (request.query.id) {
            const filter = await new accessControl(request.User).read(Resource.client).id(request.query.id);
            const client = await new typeorm(Client).findOne(request.query.id, {relations: ['referrals', 'projects', 'closures']});
            console.log(request.User);
            return response.json(filter.filter(client));
        }
        const filteredClients = await new accessControl(request.User).read(Resource.client).list();
        return response.json(filteredClients);
        
    } catch (err) {
        return next(err);
    }
}
