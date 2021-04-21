import {Request, Response, NextFunction} from 'express'
import {typeorm, accessControl} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { Skill } from '../../../library/typeorm/entity/user'

export default async (request: Request<any, any, Interface.Skill.Insert, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.skill);
        const skill = filter(request.body);
        const created = await new typeorm(Skill).create(skill);
        return response.json(created);
    } catch (err) {
        return next(err);
    }
}
