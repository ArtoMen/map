import {Response, Request} from 'express';
import {User, UserModel} from '../models/users';
// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {settings} from '../settings/settings';
import {error} from '../services/error_handler';
import {check, validationResult} from 'express-validator';
import result from '../services/result';

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
    const {headers} = req;
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
      userId: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      image: candidate.imageSrc,
    }, settings.secretKey, {expiresIn: '30d'});
    res.status(200).json({
      result: true,
      token: token,
    });
  }

  public static async edit(req: Request, res: Response) {
    const options = () => {
      interface option {
        [index: string]: any,
        fistName?: string,
        lastName?: string,
        email?: string,
        password?: string,
      }

      const opt: option = {};

      return {
        addOption(name: string, length: number, errorCode: number): boolean {
          if (req.body[name]) {
            if (req.body[name].length < length) {
              error(res, `${name} is too short`, errorCode);
              return false;
            } else {
              opt[name] = req.body[name];
              return true;
            }
          }
          return true;
        },
        addPassword(): boolean {
          if (req.body.password) {
            if (req.body.password.length < 7) {
              error(res, 'password is too short', 255);
              return false;
            } else {
              const salt = bcrypt.genSaltSync(10);
              opt.password = bcrypt.hashSync(req.body.password, salt);
              return true;
            }
          }
          return true;
        },

        async addEmail(): Promise<boolean> {
          if (req.body.email) {
            await check('email').isEmail().run(req);
            const result = validationResult(req);
            if (!result.isEmpty()) {
              error(res, 'Invalid email', 255);
              return false;
            } else {
              opt.email = req.body.email;
              return true;
            }
          }
          return true;
        },

        check(): boolean {
          if (!this.addOption('firstName', 3, 251)) return false;
          if (!this.addOption('lastName', 3, 252)) return false;
          if (!this.addEmail()) return false;
          if (!this.addPassword()) return false;
          return true;
        },
        getOptions(): any {
          return opt;
        },
      };
    };

    const opt = options();
    if (!opt.check()) {
      return;
    }
    const user = req.user as User;
    await UserModel.updateOne({_id: user.id}, {$set: opt.getOptions()});
    result(res);
  }
}
