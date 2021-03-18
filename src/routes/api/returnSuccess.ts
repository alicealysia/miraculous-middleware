import {Request, Response, NextFunction} from 'express'

export default (request: Request, response: Response) => {
    return response.send('success');
}