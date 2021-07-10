import {Router} from 'express';
import Users from '../Controllers/users';
import {validator} from '../servises/helper';
import {body} from 'express-validator';

const usersRouter = Router();

usersRouter.post(
  '/register',
  body('firstName').isLength({min: 3}),
  body('lastName').isLength({min: 3}),
  body('email').isEmail(),
  body('password').isLength({min: 7}),
  validator,
  Users.register,
);

export default usersRouter;
