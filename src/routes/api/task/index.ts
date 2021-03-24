import Router from 'express-promise-router'
import get from './get'
import post from './post'
import assign from './assign'
import update from './update'

const router = Router();

router.use(assign);
router.use(update);
router.get('/', get);
router.get('/', post);

export default router;
