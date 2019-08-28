import chalk from 'chalk';
import { argv } from 'yargs';
import * as mongooseActions from './mongoose/Actions';
import { debug } from './config/debug';
import { Arguments } from './actionDispatcher.types';

/**
 * do an action
 */
const dispatcher = async (argv: Arguments) => {
  // clear the DB
  if (argv['db-clear']) {
    require('./config/mongoose');

    debug.action('Clearing the database...');
    try {
      // clear the database
      await mongooseActions.clear();
      debug.action(chalk.green('The database has been cleared'));
    } catch (error) {
      debug.action(chalk.red('An error occured while clearing the database:'));
      throw error;
    }

    // exit the process once the database has been cleared
    process.exit(0);

  } else if (argv['db-populate']) { // populate the DB with default data
    require('./config/mongoose');

    debug.action('Populating the database with default data...');
    try {
      // populate the database with default data
      await mongooseActions.populate();
      debug.action(chalk.green('The database is populated'));
    } catch (error) {
      debug.action(chalk.red('An error occured while populating the database:'));
      throw error;
    }

    // exit the process once the database has been cleared
    process.exit(0);

  } else if (argv['db-reset']) { // reset the DB
    require('./config/mongoose');

    debug.action('Reseting the database...');

    // clear the database
    await dispatcher({ 'db-clear': true });
    // populate the database with default data
    await dispatcher({ 'db-populate': true });

    // exit the process once the database has been cleared
    process.exit(0);

  } else if (argv['server-start']) { // start the server
    debug.action('Starting the server...');

    require('./express');
    require('./socket');
  }
}

dispatcher(argv as Arguments)
  .catch(error => {
    throw error;
  });
