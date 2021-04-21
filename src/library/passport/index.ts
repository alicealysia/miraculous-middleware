import passport from 'passport'
import {Strategy as localStrategy, IStrategyOptions, IStrategyOptionsWithRequest} from 'passport-local'
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import typeorm from '../typeorm'
import {User} from '../typeorm/entity/user'

const localOptions: IStrategyOptions = { usernameField: 'email', passwordField: 'password', session: false }

const loginstrat = new localStrategy(
        localOptions, 
        async (email, password, done) => new typeorm(User).auth(email, password).then(user => done(null, user, {message: 'success'})).catch(error => done(error, null, {message: 'fail'})),
)



passport.use('loginStrat', loginstrat);


passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
},
(jwtPayload, done) => new typeorm(User).getRepository()
    .then(repo => repo.findOneOrFail(jwtPayload.uid).then(user => done(null, user)).catch(error => done(error)))
    .catch(error => done(error, null)))
);

