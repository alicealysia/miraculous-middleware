import {accessControl, database} from '../../../library'
import {Resource} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, any, {id?: number}>, response: Response, next: NextFunction) => {
    try {
    const uid = request.query.id;
    if (uid) {
        const filter = await new accessControl(request.User).read(Resource.user).id(uid);
        const user = await database.user.read.one(uid);
        return response.json(filter(user));
    }

    const userList = await database.user.read.list();
    const filteredUsers = await new accessControl(request.User).read(Resource.user).list(userList);
    return response.json(filteredUsers);

    } catch(err) {
        next(err);
    }

}
