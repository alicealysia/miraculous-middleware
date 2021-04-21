import {accessControl, typeorm} from '../../../library'
import { Resource } from '../../../types';
import { User } from '../../../library/typeorm/entity/user'
import {hash} from 'bcrypt'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, {password: string, existingPassword?: string}, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    // we're only concerned with if the user can be updated, so we don't need to keep this around.
    await new accessControl(request.User).update(Resource.user).id(uid);
    if (request.User.id === uid) {
        if (!request.body.existingPassword) {
            throw new Error('no existing password');
        }
        const authenticate = await new typeorm(User).auth(request.User.email, request.body.existingPassword)
        if (request.User !== authenticate) {
            throw new Error('incorrect old password');
        } 
    }
    const userHash = await hash(request.body.password, 12);
    await new typeorm(User).update({id: uid, userHash});
    return response.send('success');

    } catch(err) {
        next(err);
    }
}
