import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const materials = await database.material.read();
        const filteredMaterials = await new accessControl(request.User).read(Resource.material).list(materials);
        return response.json(filteredMaterials);
        
    } catch (err) {
        return next(err);
    }
}
