import {Response, Request} from 'express';
import {CommentModel} from '../models/comments';
import {User} from '../models/users';
import result from '../services/result';
import {error} from '../services/error_handler';

export default class Comments {
  public static async create(req: Request, res: Response) {
    const user = req.user as User;
    const candidate = await CommentModel.findOne({id: req.body.mark});
    if (!candidate) {
      error(res, 'Invalid markId', 251);
      return;
    }
    const commentObject = {
      content: req.body.content,
      mark: req.body.mark,
      user: user.id,
    };
    const comment = new CommentModel(commentObject);
    await comment.save();
    result(res, {});
  }

  // public static async edit(req: Request, res: Response) {
  //   const user = req.user as User;
  //   const commentObject = {
  //     content: req.body.content,
  //     updateDate: Date.now(),
  //   };
  //
  //   await CommentModel.update({}, commentObject)
  // }

  // public static async delete(req: Request, res: Response) {
  //
  // }
}
