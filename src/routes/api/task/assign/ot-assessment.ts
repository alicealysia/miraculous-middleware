import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource, InsertOTAssessment } from '../../../../types';

export default async (request: Request<any, any, InsertOTAssessment, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.otAssessment).id(request.query.id);
        const otAssessment = request.body;
        await database.task.assign.otAssessment(request.query.id, filter(otAssessment));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}