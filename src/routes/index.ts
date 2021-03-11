import Router from 'express-promise-router'
import passport from 'passport';
import auth from './auth'
import api from './api'

const router = Router();

router.use('/auth', auth);
router.use('/api', passport.authenticate('jwt', {session: false}), api);

export default router;
