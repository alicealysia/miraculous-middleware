import {accessControl, database} from '../../../library'
import {Resource, InsertUser} from '../../../types'
import {Request, Response, NextFunction} from 'express'

export default async (request: Request<any, any, {user: InsertUser, password?: string}, any>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.user);
        await database.user.create(filter(request.body.user), request.body.password);
        response.send('success');
    } catch(err) {
        next(err);
    }

}
