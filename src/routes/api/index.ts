import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import sharepoint from './sharepoint'
import xero from './xero'
import client from './client'
import project from './project'
import referral from './referral'

const router = Router();

router.get('/', (request: Request, response: Response, next: NextFunction) => {
    const msalToken = request.User.msalToken? true : false;
    const xeroToken = request.User.xeroToken? true : false;
    return response.json({...request.User, msalToken, xeroToken});
})

router.use('/sharepoint', sharepoint);
router.use('/xero', xero);

router.use('/client', client);
router.use('/project', project);
router.use('/referral', referral);

export default router;
