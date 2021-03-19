import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import {Permission} from 'accesscontrol'
import { Resource, InsertAssignment } from '../../../../types';

export default async (request: Request<any, any, InsertAssignment, {id: number}>, response: Response, next: NextFunction) => {
    try {
        await new accessControl(request.User).update(Resource.project).id(request.query.id) as Permission;
        const assignment = request.body;
        await database.project.assign.user(request.query.id, assignment);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
