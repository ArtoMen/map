import {validationResult, ValidationError} from 'express-validator';
import {Request, Response} from 'express';

export function validator(req: Request, res: Response) {
  const errorFormatter = ({msg, param}: ValidationError) => {
    return {field: param, errorMessage: msg};
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
    return false;
  } else {
    return true;
  }
}
