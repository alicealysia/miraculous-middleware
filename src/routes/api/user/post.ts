import {accessControl, typeorm} from '../../../library'
import {AccessControl, Entity, Interface} from '../../../types'
import {Request, Response, NextFunction} from 'express'
import {hash} from 'bcrypt'

export default async (request: Request<any, any, {user: Interface.User.Insert, password?: string}, any>, response: Response, next: NextFunction) => {
    try {
        const userHash = request.body.password? await hash(request.body.password, 12) : undefined;
        const filter = await new accessControl(request.User).create(AccessControl.Resource.user);
        await new typeorm(Entity.User).create({...filter(request.body.user), userHash});
        response.send('success');
    } catch(err) {
        next(err);
    }

}
