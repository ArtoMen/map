// @ts-ignore
import express from 'express';
// @ts-ignore
import passport from 'passport';
// import {settings} from './settings/settings';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(passport.initialize());
// require('./middleware/passport')(passport);
// app.use(`/${config.pathToUploads}`, express.static(config.pathToUploads));

export { app };

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('ok!');
});