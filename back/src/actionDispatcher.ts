import chalk from 'chalk';
import { argv } from 'yargs';
import * as mongooseActions from './mongoose/Actions';
import { debug } from './config/debug';

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

} else if (argv['db-populate']) { // populate the DB with default data
  require('./config/mongoose');

  debug.action('Populating the database with default data...');
  mongooseActions.populate()
    .then(() => {
      debug.action(chalk.green('The database is populated'));
      process.exit(0);
    })
    .catch((err: any) => {
      debug.action(chalk.red('An error occured while populating the database:'));
      console.error(chalk.red(err));
      process.exit(1);
    });
} else if (argv['db-reset']) { // reset the DB
  require('./config/mongoose');

  debug.action('Reseting the database...');
  debug.action('Clearing the database...');

  mongooseActions.clear()
    .then(() => {
      debug.action(chalk.green('The database has been cleared'));

      debug.action('Populating the database with default data...');
      mongooseActions.populate()
        .then(() => {
          debug.action(chalk.green('The database is populated'));
          debug.action(chalk.green('The database has been reset'));
          process.exit(0);
        })
        .catch((err: any) => {
          debug.action(chalk.red('An error occured while populating the database:'));
          console.error(chalk.red(err));
          process.exit(1);
        });
    })
    .catch((err: any) => {
      debug.action(chalk.red('The database couldn\'t be reset'));
      debug.action(chalk.red('An error occured while clearing the database:'));
      console.error(chalk.red(err));
      process.exit(1);
    });
} else if (argv['server-start']) { // start the server
  debug.action('Starting the server...');

  require('./express');
  require('./socket');
}
