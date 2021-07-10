import {Response, Request} from 'express';
import {UserModel} from '../models/users';
// @ts-ignore
import bcrypt from 'bcrypt';

export default class Users {
  public static async register(req: Request, res: Response) {
    const salt = bcrypt.genSaltSync(10);
    const user = new UserModel({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'email': req.body.email,
      'password': bcrypt.hashSync(req.body.password, salt),
    });
    user.save();
    res.status(200).json({ok: true});
  }
}
