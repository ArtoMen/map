import {Request, Response} from 'express';
// @ts-ignore
import moment from 'moment';
import {unlink} from 'fs';

import {MarkModel} from '../models/marks';
import {error} from '../services/error_handler';
import {User} from '../models/users';
import result from '../services/result';
import {uploadFiles} from '../middleware/helper';


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
      files: uploadFiles(req),
    });
    await marks.save();

    if (marks) {
      result(res);
    } else {
      error(res, 'Mark create error', 251 );
    }
  }

  public static async editMark(req: Request, res: Response) {
    const fields = {
      title: req.body.title ? req.body.title : null,
      content: req.body.content ? req.body.content : null,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    if (fields.title === null) delete fields.title;
    if (fields.content === null) delete fields.content;

    const update = await MarkModel.updateOne(
      {_id: req.body.mark_id},
      {$set: fields},
    );

    if (update.ok) {
      result(res);
    } else {
      error(res, 'Mark update error', 252 );
    }
  }

  public static async deleteMark(req: Request, res: Response) {
    const mark = await MarkModel.findOne({_id: req.body.mark_id});
    const markDelete = await MarkModel.deleteOne({_id: req.body.mark_id});

    mark!.files.forEach((e) => {
      unlink(e.fileSrc, () => {
        return true;
      });
    });

    if (markDelete) {
      result(res);
    } else {
      return error(res, 'Mark delete error', 253 );
    }
  }

  public static async uploadFile(req: Request, res: Response) {
    const update = await MarkModel.updateOne(
      {_id: req.body.mark_id},
      {$push: {files: uploadFiles(req)}},
    );

    if (update.ok) {
      result(res);
    } else {
      error(res, 'Delete files error', 254);
    }
  }

  public static async deleteFile(req: Request, res: Response) {
    const update = await MarkModel.updateOne(
      {_id: req.body.mark_id},
      {$pull: {files: {fileSrc: req.body.src}}},
    );

    unlink(req.body.src, () => {
      return true;
    });

    if (update.ok) {
      result(res);
    } else {
      error(res, 'Delete files error', 254);
    }
  }
}
