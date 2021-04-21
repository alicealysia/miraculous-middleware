import Router from 'express-promise-router'
import get from './get'
import password from './password'
import post from './post'
import put from './put'

const router = Router()

router.get('/', get);
router.post('/', post);
router.put('/', put);
router.put('/password', password);

export default router;
