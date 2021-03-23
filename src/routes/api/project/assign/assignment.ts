import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, InsertAssignment} from '../../../../types';

export default async (request: Request<any, any, InsertAssignment, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).update(Resource.project).id(request.query.id);
        const assignment = filter({assignments: request.body}).assignments;
        await database.project.assign.user(request.query.id, assignment);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
