import {accessControl, database} from '../../../library'
import {Resource, Leave} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, Leave, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(Resource.user).id(uid);
    //rest of filtered user doesn't concern us, so we're using a dirty workaround
    const filtered = filter({...request.User, leave: [request.body]}).leave;
    if (!filtered) {
        throw new Error('unauthorized')
    }
    await database.user.assign.leave(filtered[0], uid);
    return response.send('success');

    } catch(err) {
        next(err);
    }
}
