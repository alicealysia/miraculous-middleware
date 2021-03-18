import passport from 'passport'
import {Strategy as localStrategy, IStrategyOptions, IStrategyOptionsWithRequest} from 'passport-local'
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import database from '../database'

const localOptions: IStrategyOptions = { usernameField: 'email', passwordField: 'password', session: false }

const loginstrat = new localStrategy(
        localOptions, 
        async (email, password, done) => database.user.read.auth(email, password).then(user => done(null, user, {message: 'success'})).catch(error => done(error, null, {message: 'fail'})),
)



passport.use('loginStrat', loginstrat);


passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
},
(jwtPayload, done) => database.user.read.one(jwtPayload.uid).then(user => done(null, user)).catch(error => done(error))));

