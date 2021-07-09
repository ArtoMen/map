import {Router} from 'express';
import Users from '../Controllers/users';
const usersRouter = Router();

usersRouter.get('/register', Users.register);

export default usersRouter;
