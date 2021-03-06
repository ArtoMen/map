// @ts-ignore
import express from 'express';
// @ts-ignore
import passport from 'passport';
// @ts-ignore
import mongoose from 'mongoose';
import {settings} from './settings/settings';
import usersRouter from './routes/users';
import marksRouter from './routes/marks';
import commentRouter from './routes/comments';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private routes() {
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/marks', marksRouter);
    this.app.use('api/comments', commentRouter);
  }

  private config() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(passport.initialize());
    this.app.use('/file', express.static('uploads/'));
  }

  private async database() {
    try {
      await mongoose.connect(settings.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DataBase connect!');
    } catch (e) {
      console.log('DataBase connect error!');
      console.log(e);
    }
  }

  public async start() {
    await this.database();
    this.app.listen(settings.PORT, () => console.log('Server start!'));
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).json('ok!');
    });
  }
}

const server: Server = new Server();
server.start();
