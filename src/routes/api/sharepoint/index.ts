import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import {getCodeURL, getToken, users} from '../../../library/sharepoint'
import database from '../../../library/database'

const router = Router();

router.get('/', async (request: Request, response: Response, next: NextFunction) => getCodeURL().then(code => response.send(code)).catch(error => next(error)));

router.get('/redirect', async (request, response, next) => {
    const token = await getToken(request.query.code as string).catch(error => next(error));
    await database.user.setMSAL(request.User.id, token.accessToken);
    return response.redirect('https://database.tadact.org.au/');
});

router.get('/users', async (request, response, next) => {
    if (!request.User.msalToken) {
        return next(new Error('no msal token'));
    }
    return response.json(users(request.User.msalToken));
})

export default router;
