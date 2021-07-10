import {Response} from 'express';

export function error(res: Response, message: string, code: number) {
  res.status(400).json({
    result: false,
    message: message,
    code: code,
  });
}
