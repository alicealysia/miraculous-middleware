import {Request, Response, NextFunction, } from 'express'

export default (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err);
    response.status(500).send('something went wrong');
}