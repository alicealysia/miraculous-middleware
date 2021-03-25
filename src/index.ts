const result = require('dotenv').config();
import express from 'express'
import passport from 'passport'
import {bootFunc} from './boot';
import routes from './routes';
import cookieParser from 'cookie-parser'
import errorHandler from './middleware/error-handler'
import './library/passport'
import 'isomorphic-fetch'
import { User } from './types';

const app = express();
const port = 8080;

type ExpressUser = User;

declare global {
    namespace Express {
        export interface Request {
            User: ExpressUser;
        }
    }
}


app.use(express.json());
app.use(express.text())
app.use(express.raw());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/', routes);
app.use(errorHandler);


if (result.parsed) {
    console.log(result.parsed);
    bootFunc();
} else {
    throw result.error;
}

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})