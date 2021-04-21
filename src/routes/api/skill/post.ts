import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { AccessControl, Interface, Entity } from '../../../types';

export default async (request: Request<any, any, Interface.Skill.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(AccessControl.Resource.skill);
        const skill = filter(request.body);
        const created = await new typeorm(Entity.Skill).create(skill);
        return response.json(created);
    } catch (err) {
        return next(err);
    }
}
