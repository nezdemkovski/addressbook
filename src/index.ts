import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import logger from 'morgan';

import { PORT } from './config';
import initFirebase from './db/firebase';
import initMongoDB from './db/mongodb';
import contactsRouter from './routes/contacts';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

debug('strv:server');
const app: express.Application = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

if (process.env.NODE_ENV !== 'test') {
  initMongoDB();
  initFirebase();

  app.listen(PORT, () => {
    /* tslint:disable-next-line:no-console */
    console.log(`Listening at http://localhost:${PORT}/`);
  });
}

export default app;
