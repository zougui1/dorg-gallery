import dotenv from 'dotenv';
import PrettyError from 'pretty-error';
import './debug';

dotenv.config();
PrettyError.start();

process
  .on('unhandledRejection', (reason, p) => {
    throw reason;
  })
  .on('uncaughtException', err => {
    console.error(err);
  });
