import {Request, Response, NextFunction} from 'express'
import {accessControl} from '../../../library'
import { AccessControl } from '../../../types';

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const skills = await new accessControl(request.User).read(AccessControl.Resource.skill).list();
        return response.json(skills);
        
    } catch (err) {
        return next(err);
    }
}
