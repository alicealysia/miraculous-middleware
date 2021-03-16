import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import sharepoint from './sharepoint'

const router = Router();

router.get('/', (request: Request, response: Response, next: NextFunction) => {
    return response.json({...request.User, msalToken: ''});
})

router.get('/test', (request: Request, response: Response, next: NextFunction) => {
    return response.json({message: 'success!'});
})

router.use('/sharepoint', sharepoint);

export default router;
