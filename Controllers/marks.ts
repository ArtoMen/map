import {Response, Request} from 'express';
import {validator} from '../servises/helper';
export default class Marks {
  public static async createMark(req: Request, res: Response) {
    if (!validator(req, res)) return false;

    res.status(200).json('s');
  }
}


