import {Request, Response, NextFunction} from 'express'
import {database, accessControl} from '../../../../library'
import { Resource } from '../../../../types';

export default async (request: Request<any, any, {invoiceLink: string, cost: number}, {id: number}>, response: Response, next: NextFunction) => {
    try {
        const contractId = request.query.id;
        const filter = await new accessControl(request.User).update(Resource.contract).id(contractId);
        const contract = filter({...request.body, id: contractId});
        await database.task.update.invoice(contractId, contract.invoiceLink, contract.cost);
        return response.send(`success`);
    } catch (err) {
        return next(err);
    }
}