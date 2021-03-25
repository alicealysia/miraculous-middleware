import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, InsertMaterial } from '../../../types';

export default async (request: Request<any, any, InsertMaterial, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.material);
        const material = request.body;
        const id = await database.material.create(filter(material));
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
