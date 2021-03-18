import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'
import {sharepoint} from '../../../library'
import database from '../../../library/database'
import returnSuccess from '../returnSuccess'

const router = Router();

router.get('/consent', async (request: Request, response: Response, next: NextFunction) => sharepoint.getCodeURL().then(code => {
    return response.send(code)
}).catch(error => next(error)));

router.get('/token', async (request, response, next) => {
    const token = await sharepoint.getToken(request.query.code as string).catch(error => next(error));
    console.log(token);
    await database.user.setMSAL(request.User.id, token.accessToken);
    request.User.msalToken = token.accessToken;
    return next();
}, returnSuccess);

router.get('/items', async (request, response, next) => {
    if (!request.User.msalToken) {
        return next(new Error('no msal token'));
    }
    const path = request.query.folderId as string | undefined;
    const site = await sharepoint.sites(request.User.msalToken, path);
    return response.json(site);
})

export default router;
