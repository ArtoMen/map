import {Response, Request} from 'express';
// @ts-ignore
import moment from 'moment';
import {unlink} from 'fs/promises';

import {MarkModel} from '../models/marks';
import {error} from '../services/error_handler';
import {User} from '../models/users';
import {uploadFile} from '../middleware/helper';


export default class Marks {
  public static async createMark(req: Request, res: Response) {
    const user: User = req.user as User;
    const marks = new MarkModel({
      title: req.body.title,
      content: req.body.content,
      location: {
        type: 'Point',
        coordinates: req.body.coordinates,
      },
      user: user.id,
      icon: req.file ? req.file!.filename : null,
    });
    await marks.save();
    if (marks) {
      res.status(200).json({result: true});
    } else {
      error(res, 'Mark create error', 251 );
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
      error(res, 'Mark update error', 252 );
    }
  }
  public static async deleteMark(req: Request, res: Response) {
    const mark = await MarkModel.findOne({_id: req.body.mark_id});
    const deletemark = await MarkModel.deleteOne({_id: req.body.mark_id});

    await unlink(`uploads/${mark!.icon}`);

    if (deletemark) {
      res.status(200).json({result: true});
    } else {
      return error(res, 'Mark delete error', 253 );
    }
  }
}

