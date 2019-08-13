import chalk from 'chalk';
import yargs from 'yargs';
import * as mongooseActions from './mongoose/Actions';
import { debug } from './config/debug';

const argv = yargs.argv

// clear the DB
if (argv['db-clear']) {
  require('./config/mongoose');

  debug.action('Clearing the database...');
  mongooseActions.clear()
    .then(() => {
      debug.action(chalk.green('The database has been cleared'));
      process.exit(0);
    })
    .catch((err: any) => {
      debug.action(chalk.red('An error occured while clearing the database:'));
      console.error(chalk.red(err));
      process.exit(1);
    });

} else if (argv['server-start']) { // start the server
  debug.action('Starting the server...');

  require('./express');
  require('./socket');
}
