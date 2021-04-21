import Router from 'express-promise-router'
import passport from 'passport';
import auth from './auth'
import api from './api'
import unAuth from './unAuth'
import {User} from '../library/typeorm/entity/user'
import { Request, Response, NextFunction} from 'express';

const router = Router();

router.use('/auth', auth);
router.use('/api', passport.authenticate('jwt', {session: false}), (request: Request, response: Response, next: NextFunction) => {
    if (request.user){
        request.User = request.user as User;
    }
    next();
}, api);
router.post('/unAuth/client', unAuth);

export default router;
