import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import {idInit} from '../../../../library/access-control'
import { Resource, InsertContract } from '../../../../types';

export default async (request: Request<any, any, InsertContract, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).create(Resource.contract).id(request.query.id);
        const contract = request.body;
        await database.task.assign.contract(request.query.id, filter(contract));
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
