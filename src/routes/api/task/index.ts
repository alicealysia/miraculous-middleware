import Router from 'express-promise-router'
import get from './get'
import post from './post'
import put from './put'

const router = Router();

router.put('/', put);
router.get('/', get);
router.post('/', post);

export default router;
