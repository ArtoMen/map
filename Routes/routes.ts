import {Router} from 'express';
import usersRouter from './user';

// eslint-disable-next-line new-cap
const routes = Router();

routes.use('/api/users', usersRouter);

export default routes;
