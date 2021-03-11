import login from './login'
import Router from 'express-promise-router'

const router = Router();

router.use(login);

export default router;
