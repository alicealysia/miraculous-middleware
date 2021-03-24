import {accessControl, database} from '../../../library'
import {Resource, Leave} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, Leave, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(Resource.user).id(uid);
    await database.user.assign.leave(filter({leave: request.body}).leave, uid);
    return response.send('success');

    } catch(err) {
        next(err);
    }
}
