// @ts-ignore
import express from 'express';
// @ts-ignore
// import passport from 'passport';
import {connect} from './servises/database';
import routes from './Routes/routes';

connect();
export const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
// app.use(passport.initialize());
// require('./middleware/passport')(passport);
// app.use(`/${config.pathToUploads}`, express.static(config.pathToUploads));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('ok!');
});
