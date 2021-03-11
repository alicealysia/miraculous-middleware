import {Request, Response, NextFunction} from 'express'
import Router from 'express-promise-router'
import {sign} from 'jsonwebtoken'
import passport from 'passport'
import {User} from '../../types'

const router = Router();

router.post(
    '/login', 
    async (request: Request, response: Response, next: NextFunction) => {
        passport.authenticate('loginStrat', async (err, user, info) => {
            console.log(info);
            //check for failure
            if (err || !user || !process.env.JWT_SECRET) {
                const error = new Error ('an error occurred, err: ' + err + ' user: ' + user + ' secret: ' + process.env.JWT_SECRET);
                return next(error);
            }
            const secret = process.env.JWT_SECRET;
            //login, loading user, and checking for errors
            request.login(
                user, 
                {session: false},
                async (err) => {
                if (err) {
                    return next(err);
                }
                const token = sign({uid: user.id, iat: Math.floor(Date.now() / 1000), iss: 'database.tadact.org.au'}, secret);
                return response.json({user, token});
            });
            //success!
        }) (request, response, next);
});

export default router;
