import Router from 'express-promise-router'
import assignment from './assignment'
import invoice from './invoice'
import material from './material'
import materialEstimate from './materialEstimate'
import quote from './quote'

const router = Router();
router.post('/assignment', assignment);
router.post('/invoice', invoice);
router.post('/material', material);
router.post('/material-estimate', materialEstimate);
router.post('/quote', quote);
export default router;
