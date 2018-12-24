import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import logger from 'morgan';

import { PORT } from './config';
import db from './db';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

db();
debug('strv:server');
const app: express.Application = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  /* tslint:disable-next-line:no-console */
  console.log(`Listening at http://localhost:${PORT}/`);
});
