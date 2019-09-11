import chalk from 'chalk';
import { argv } from 'yargs';
import * as mongooseActions from './mongoose/Actions';
import { debug } from './config/debug';
import { Arguments } from './actionDispatcher.types';
import './config/mongoose';
import './express';
import './socket';

/**
 * do an action
 */
const dispatcher = async (argv: Arguments) => {
  // clear the DB
  if (argv['db-clear']) {

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

    debug.action('Reseting the database...');

    // clear the database
    await dispatcher({ 'db-clear': true });
    // populate the database with default data
    await dispatcher({ 'db-populate': true });

    // exit the process once the database has been cleared
    process.exit(0);

  } else { // start the server
    debug.action('Starting the server...');
  }
}

dispatcher(argv as Arguments)
  .then()
  .catch(error => {
    throw error;
  });
