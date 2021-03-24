import Router from 'express-promise-router'
import contract from './contract'
import otAssessment from './ot-assessment'

const router = Router();

router.post('/contract', contract);
router.post('/ot-assessment', otAssessment);

export default router;
