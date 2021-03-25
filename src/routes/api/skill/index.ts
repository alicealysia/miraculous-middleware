import Router from 'express-promise-router'
import get from './get'
import post from './post'

const router = Router();

router.get('/', get);
router.post('/', post);

export default router;
