import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {settings} from '../settings/settings';
import {User} from '../models/users';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const {headers} = req;
  if (!headers.authorization) {
    res.status(401).json({
      result: false,
      message: 'Unauthorized',
      code: 401,
    });
    return;
  }
  try {
    const user: User = jwt.verify(headers.authorization!, settings.secretKey) as User;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({
      result: false,
      message: 'Unauthorized',
      code: 401,
    });
  }
}
