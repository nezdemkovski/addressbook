import mongoose from 'mongoose';

import { MONGO_URL } from '../config';

(mongoose as any).Promise = global.Promise;

export default async () => {
  try {
    await mongoose.connect(
      MONGO_URL,
      { useCreateIndex: true, useNewUrlParser: true },
    );

    console.log('MongoDB connection is running.'); // tslint:disable-line:no-console
  } catch (error) {
    /* tslint:disable-next-line:no-console */
    console.error(`MongoDB connection error: ${error}.`);
  }
};
