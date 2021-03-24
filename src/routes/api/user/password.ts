import {accessControl, database} from '../../../library'
import {Resource, User} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, {password: string, existingPassword?: string}, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(Resource.user).id(uid);
    if (request.User.id === uid) {
        if (!request.body.existingPassword) {
            throw new Error('no existing password');
        }
        const authenticate = await database.user.read.auth(request.User.email, request.body.existingPassword);
        if (request.User !== authenticate) {
            throw new Error('incorrect old password');
        } 
    }
    await database.user.update.password(uid, filter(request.body).password);
    return response.send('success');

    } catch(err) {
        next(err);
    }
}
