// @ts-ignore
import express from 'express';
// @ts-ignore
// import passport from 'passport';
import mongoose from 'mongoose';
import {settings} from './settings/settings';
import usersRouter from './Routes/user';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private routes() {
    this.app.use('/api/users', usersRouter);
  }

  private config() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    // this.app.use(passport.initialize());
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
    this.app.listen(8080, () => console.log('Server start!'));
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).json('ok!');
    });
  }
}

const server = new Server();
server.start();
