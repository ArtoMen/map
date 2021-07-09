import {Response, Request} from 'express';

export default class Users {
  public static register(req: Request, res: Response) {
    res.status(200).json({ok: true});
  }
}
