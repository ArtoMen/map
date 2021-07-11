import {validationResult, ValidationError} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

import {FilesModel} from '../models/files';
// @ts-ignore
import moment from 'moment';

export function validator(req: Request, res: Response, next: NextFunction) {
  const errorFormatter = ({msg, param}: ValidationError) => {
    return {field: param, errorMessage: msg};
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
    return false;
  } else {
    next();
    return true;
  }
}

export async function uploadFile(req: Request, id: number) {
  const newFile = new FilesModel({
    fileSrc: req.file!.filename,
    uploadDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    mark: id,
  });
  await newFile.save();
  return newFile;
}
