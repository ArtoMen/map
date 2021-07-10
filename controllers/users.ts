import {Response, Request} from 'express';
import {User, UserModel} from '../models/users';
// @ts-ignore
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {settings} from '../settings/settings';

export default class Users {
  public static async register(req: Request, res: Response) {
    const candidate = await UserModel.findOne({email: req.body.email});
    if (candidate) {
      res.status(409).json({
        result: false,
        message: 'Email is already in use',
        code: 251,
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const user = new UserModel({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'email': req.body.email,
      'password': bcrypt.hashSync(req.body.password, salt),
    });
    user.save();
    res.status(200).json({result: true});
  }

  public static async login(req: Request, res: Response) {
    const error = (res: Response) => {
      res.status(401).json({
        result: false,
        message: 'Wrong login or password',
        code: 251,
      });
    };

    const candidate = await UserModel.findOne({email: req.body.email});
    if (!candidate) {
      error(res);
      return;
    }

    if (!bcrypt.compareSync(req.body.password, candidate.password!)) {
      error(res);
      return;
    }

    const token = jwt.sign({
      id: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      image: candidate.imageSrc,
    }, settings.secretKey, {expiresIn: '30d'});
    res.status(200).json({
      result: true,
      token: `Bearer ${token}`,
    });
  }
}
