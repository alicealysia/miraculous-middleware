import {Request, Response, NextFunction} from 'express'
import { DeepPartial } from 'typeorm';
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import {Client} from '../../../library/typeorm/entity/client'

export default async (request: Request<any, any, DeepPartial<Client>, {id: number}>, response: Response, next: NextFunction) => {
    console.log('putting client')
    try {
        console.log('checking permissions');
        const clientId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.client).id(clientId);
        const client = request.body;
        console.log('inserting to database');
        await new typeorm(Client).update(filter.filter(client), clientId);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}