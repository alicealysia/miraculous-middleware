import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const filteredMaterials = await new accessControl(request.User).read(Resource.material).list();
        return response.json(filteredMaterials);
        
    } catch (err) {
        return next(err);
    }
}
