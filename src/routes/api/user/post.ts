import {accessControl, typeorm} from '../../../library'
import { Resource } from '../../../types';
import { Interface } from '../../../library/typeorm/'
import { User } from '../../../library/typeorm/entity/user'
import {Request, Response, NextFunction} from 'express'
import {hash} from 'bcrypt'

export default async (request: Request<any, any, {user: Interface.User.Insert, password?: string}, any>, response: Response, next: NextFunction) => {
    try {
        const userHash = request.body.password? await hash(request.body.password, 12) : undefined;
        const filter = await new accessControl(request.User).create(Resource.user);
        await new typeorm(User).create({...filter.filter(request.body.user), userHash});
        response.send('success');
    } catch(err) {
        next(err);
    }

}
