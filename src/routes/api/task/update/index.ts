import Router from 'express-promise-router'
import begin from './begin'
import complete from './complete'
import continueTask from './continue'
import invoice from './invoice'
import quote from './quote'

const router = Router();

router.put('/begin', begin);
router.put('/complete', complete);
router.put('/', continueTask);
router.post('/contract/invoice', invoice);
router.post('/contract/quote', quote);

export default router;
