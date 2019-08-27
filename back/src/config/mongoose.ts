import mongoose from 'mongoose';
import chalk from 'chalk';
import { debug } from './debug';

mongoose.Promise = Promise;
const mongoUri: string = process.env.MONGO_URI || '';

mongoose.connect(mongoUri, { useNewUrlParser: true })
  .then(() => debug.mongoose(chalk.green('MongoDB started')))
  .catch(err => {
    console.error(chalk.red(`MongoDB connection error ${err}`));
    process.exit(1);
  });

//mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
