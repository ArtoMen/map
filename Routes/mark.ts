import {Router} from 'express';
import Marks from '../Controllers/marks';
import {body} from 'express-validator';

// eslint-disable-next-line new-cap
const markRouter = Router();

markRouter.post(
    '/create',
    body('title', 'Title is empty').isEmpty(),
    body('title', 'Title must not exceed 1000 characters')
        .isLength({max: 10}),
    body('content', 'Content is empty').isEmpty(),
    body('content', 'Сontent must not exceed 1000 characters')
        .isLength({max: 1000}),
    Marks.createMark,
);

export default markRouter;
