import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../library'
import { Resource, InsertMaterial } from '../../../types';

export default async (request: Request<any, any, {skill: string}, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.skill);
        const skill = filter(request.body.skill);
        const id = await database.skill.create(skill);
        return response.send(`${id}`);
    } catch (err) {
        return next(err);
    }
}
