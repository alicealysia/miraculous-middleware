import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import sharepoint from './sharepoint'
import xero from './xero'

const router = Router();

router.get('/', (request: Request, response: Response, next: NextFunction) => {
    const msalToken = request.User.msalToken? true : false;
    return response.json({...request.User, msalToken});
})

router.get('/test', (request: Request, response: Response, next: NextFunction) => {
    return response.json({message: 'success!'});
})

router.use('/sharepoint', sharepoint);

router.use('/xero', xero);

export default router;
