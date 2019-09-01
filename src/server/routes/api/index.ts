import * as express from 'express';
import * as passport from 'passport';
import msgRouter from './message';
import roomsRouter from './rooms';
import usersRouter from './users'

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    passport.authenticate('bearer', { session: false}, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

apiRouter.use('/message', msgRouter);
apiRouter.use('/rooms', roomsRouter);
apiRouter.use('/users', usersRouter);
export default apiRouter;