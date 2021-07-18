import {Router} from 'express';
import {validator} from '../middleware/helper';
import {body, check} from 'express-validator';
import Comments from '../controllers/comments';
import auth from '../middleware/passport';

const commentRouter = Router();

commentRouter.post(
  '/create',
  auth,
  body('content', 'Invalid content').isLength({min: 10, max: 1000}),
  body('mark', 'Invalid markId').notEmpty(),
);

export default commentRouter;
