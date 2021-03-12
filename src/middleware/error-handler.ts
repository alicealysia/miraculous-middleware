import {Request, Response, NextFunction, } from 'express'
import {ErrorStructure, ErrorTypes} from '../types'

export default (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err);
    try {
        const error = JSON.parse(err.message) as ErrorStructure;
        if (error.type === ErrorTypes.SignInFailure) {
            if (error.possibleNulls[1] === null || undefined) {
                return response.status(503).send('API down, please try again later');
            }
            if (error.possibleNulls[0] === null) {
                return response.status(401).send('Username or Password incorrect');
            }
            return response.status(503).send('API down, please try again later');
        }
        if (error.type === ErrorTypes.TokenExpired) {
            return response.status(401).send('not signed in');
        }
        return response.status(500).send('something went wrong');
    } catch {
        return response.status(500).send('something went wrong');
    }
}