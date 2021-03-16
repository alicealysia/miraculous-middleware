import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import {getCodeURL, getToken, sites} from '../../../library/sharepoint'
import database from '../../../library/database'

const router = Router();

router.get('/login', async (request: Request, response: Response, next: NextFunction) => getCodeURL().then(code => {
    return response.send(code)
}).catch(error => next(error)));

router.get('/redirect', async (request, response, next) => {
    const token = await getToken(request.query.code as string).catch(error => next(error));
    console.log(token);
    await database.user.setMSAL(request.User.id, token.accessToken);
    request.User.msalToken = token.accessToken;
    return response.redirect('https://database.tadact.org.au/');
});

router.get('/items', async (request, response, next) => {
    if (!request.User.msalToken) {
        return next(new Error('no msal token'));
    }
    const path = request.query.folderId as string | undefined;
    const site = await sites(request.User.msalToken, path);
    return response.json(site);
})

export default router;
