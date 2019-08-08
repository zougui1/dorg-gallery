const chalk = require('chalk');
const mongoose = require('mongoose');
const argv = require('yargs').argv;
const mongooseActions = require('./mongoose/Actions');

if (argv['db-clear']) {
  require('./config/mongoose');

  debug.action('Clearing the database...');
  mongooseActions.clear()
    .then(() => {
      debug.action(chalk.green('The database has been cleared'));
      process.exit(0);
    })
    .catch(err => {
      debug.action(chalk.red('An error occured while clearing the database:'));
      console.error(chalk.darkRed(err));
      process.exit(1);
    });

} else if (argv['server-start']) {
  debug.action('Starting the server...');

  require('./express');
  require('./socket');
}
