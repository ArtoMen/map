import {Router} from 'express';
import Marks from '../controllers/marks';
import {body} from 'express-validator';
import {validator} from '../servises/helper';

// eslint-disable-next-line new-cap
const markRouter = Router();

markRouter.post(
    '/create',
    body('title', 'Field minimum length 1 and maximum 1000')
        .isLength({min: 1, max: 80}),
    body('content', 'Field minimum length 1 and maximum 1000')
        .isLength({min: 1, max: 1000}),
    body('coordinates', 'Field is empty').notEmpty(),
    validator,
    Marks.createMark,
);

export default markRouter;
