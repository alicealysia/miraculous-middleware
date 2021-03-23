import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {invoice: string}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).update(Resource.project).id(request.query.id);
        const invoice = filter({invoices: request.body.invoice}).invoices
        await database.project.assign.invoice(request.query.id, invoice);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
