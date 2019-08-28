import dotenv from 'dotenv';
import PrettyError from 'pretty-error';
import './debug';

dotenv.config();
PrettyError.start();

process
  // we throw the cause of the rejection that hasn't been handled
  .on('unhandledRejection', (reason, p) => {
    throw reason;
  })
  // TODO handle the uncaught exceptions properly
  .on('uncaughtException', err => {
    console.error(err);
  });
