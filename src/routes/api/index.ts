import Router from 'express-promise-router'
import {Request, Response, NextFunction} from 'express'

const router = Router();

router.get('/test', (request: Request, response: Response, next: NextFunction) => {
    return response.json({message: 'success!'});
})

export default router;
