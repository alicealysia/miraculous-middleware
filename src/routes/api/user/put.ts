import {accessControl, database} from '../../../library'
import {Resource, User} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, User, {id: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    const filter = await new accessControl(request.User).update(Resource.user).id(uid);
    await database.user.update.details(filter(request.body));
    return response.send('success');

    } catch(err) {
        next(err);
    }

}
