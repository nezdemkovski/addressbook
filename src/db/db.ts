import mongoose from 'mongoose';

import { MONGO_URL } from '../config';

(mongoose as any).Promise = global.Promise;

export default () =>
  mongoose
    .connect(
      MONGO_URL,
      { useCreateIndex: true, useNewUrlParser: true },
    )
    .then(
      () => console.log('MongoDB is running.'), // tslint:disable-line:no-console
    )
    .catch(err => {
      /* tslint:disable-next-line:no-console */
      console.error(`MongoDB connection error: ${err}.`);
    });
