import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import {Permission} from 'accesscontrol'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {invoice: string}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        await new accessControl(request.User).update(Resource.project).id(request.query.id) as Permission;
        await database.project.assign.invoice(request.query.id, request.body.invoice);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
