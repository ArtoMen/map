import {Response, Request} from 'express';
import {MarkModel} from '../models/marks';

export default class Marks {
  public static async createMark(req: Request, res: Response) {
    const marks = new MarkModel({
      title: req.body.title,
      content: req.body.content,
      location: {
        type: 'Point',
        coordinates: req.body.coordinates,
      },
      user: '60e95cff518cd13bc0d1f471', // add user objID
      icon: '60e95cff518cd13bc0d1f471', // add icon objID
    });
    marks.save();

    if (marks) {
      res.status(200).json({result: true});
    } else {
      res.status(400).json({
        result: false,
        message: 'Mark create error',
        code: 251,
      });
    }
  }
}

