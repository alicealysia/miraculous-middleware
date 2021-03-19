import Router from 'express-promise-router'
import get from './get'
import post from './post'
import assign from './assign'

const router = Router();

router.get('/', get);
router.post('/', post);
router.use('/', assign);

export default router
