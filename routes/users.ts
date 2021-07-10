import {Router} from 'express';
import {validator} from '../middleware/helper';
import {body} from 'express-validator';
import Users from '../controllers/users';

const usersRouter = Router();

usersRouter.post(
  '/register',
  body('firstName', 'Minimal length 3').isLength({min: 3}),
  body('lastName', 'Minimal length 3').isLength({min: 3}),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Minimal length 7').isLength({min: 7}),
  validator,
  Users.register,
);

usersRouter.post(
  '/login',
  body('email', 'Invalid email').isEmail(),
  body('password', 'Minimal length 7').isLength({min: 7}),
  validator,
  Users.login,
);

export default usersRouter;
