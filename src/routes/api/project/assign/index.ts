import Router from 'express-promise-router'
import invoice from './invoice'
import material from './material'
import materialEstimate from './materialEstimate'
import quote from './quote'

const router = Router();
router.post('/invoice', invoice);
router.post('/material', material);
router.post('/material-estimate', materialEstimate);
router.post('/quote', quote);
export default router;
