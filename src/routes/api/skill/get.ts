import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource } from '../../../types';

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const skills = await database.skill.read();
        const filteredSkills = await new accessControl(request.User).read(Resource.skill).list(skills);
        return response.json(filteredSkills);
        
    } catch (err) {
        return next(err);
    }
}
