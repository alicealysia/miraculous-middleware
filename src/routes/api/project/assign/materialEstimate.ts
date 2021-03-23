import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import {Permission} from 'accesscontrol'
import { Resource, AssignMaterial } from '../../../../types';

export default async (request: Request<any, any, AssignMaterial, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).update(Resource.assignMaterial).id(request.query.id);
        const material = filter({materialEstimates: request.body}).materialEstimates;
        await database.project.assign.materialEstimate(request.query.id, material);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
