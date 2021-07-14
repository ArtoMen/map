import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {settings} from '../settings/settings';

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
    interface user {
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      image: string,
    }
    req.user = jwt.verify(headers.authorization!, settings.secretKey) as user;
    next();
  } catch (e) {
    res.status(401).json({
      result: false,
      message: 'Unauthorized',
      code: 401,
    });
  }
}
