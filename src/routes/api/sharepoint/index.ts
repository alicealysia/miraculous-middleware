import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import {getCodeURL, getToken} from '../../../library/sharepoint'

const router = Router();

router.get('/', async (request: Request, response: Response, next: NextFunction) => getCodeURL().then(code => response.redirect(code)).catch(error => next(error)));

router.get('/redirect', async (request, response, next) => getToken(request.query.code as string).then(token => console.log(token)).catch(error => next(error)));

export default router;
