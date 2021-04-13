// import {Request, Response, NextFunction} from 'express'
// import {typeorm, accessControl} from '../../../library'
// import { AccessControl, Interface } from '../../../types';

// export default async (request: Request<any, any, any, {id: number}>, response: Response, next: NextFunction) => {
//     try {
//         const filter = await new accessControl(request.User).read(AccessControl.Resource.closure).id(request.query.id);
//         const costing = await database.billing.costings(request.query.id);
//         return response.json(filter(costing));
//     } catch (err) {
//         return next(err);
//     }
// }
