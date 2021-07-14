import {Response} from 'express';

export default function result(res: Response, object: any = {}) {
  object.result = true;
  res.status(200).json(object);
}
