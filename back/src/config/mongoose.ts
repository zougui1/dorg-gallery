import mongoose from 'mongoose';
import chalk from 'chalk';
import { api } from './api';
import { debug } from './debug';

mongoose.Promise = Promise;

mongoose.connect(api.monngoURI, { useNewUrlParser: true })
  .then(() => debug.mongoose(chalk.green('MongoDB starting')))
  .catch(err => {
    console.error(chalk.red(`MongoDB connection error ${err}`));
    process.exit(1);
  });

//mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);