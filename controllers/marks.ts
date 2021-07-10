import {Response, Request} from 'express';
// @ts-ignore
import moment from 'moment';

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
  public static async editMark(req: Request, res: Response) {
    const fields = {
      title: req.body.title ? req.body.title : null,
      content: req.body.content ? req.body.content : null,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      icon: req.body.icon ? req.body.icon : null, // change on req.file
    };

    if (fields.title === null) delete fields.title;
    if (fields.content === null) delete fields.content;
    if (fields.icon === null) delete fields.icon;


    const result = await MarkModel.updateOne(
      {_id: req.body.mark_id},
      {$set: fields},
    );

    if (result.ok) {
      res.status(200).json({result: true});
    } else {
      res.status(400).json({
        result: false,
        message: 'Mark update error',
        code: 252,
      });
    }
  }
}

