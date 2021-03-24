import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {invoice: string, amount: number}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const filter = await new accessControl(request.User).update(Resource.project).id(request.query.id);
        const filtered = filter({invoices: request.body.invoice, amountInvoiced: request.body.amount});
        await database.project.assign.invoice(request.query.id, filtered.invoices, filtered.amountInvoiced);
        return response.send('success');
    } catch (err) {
        return next(err);
    }
}
