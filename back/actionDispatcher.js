const chalk = require('chalk');
const argv = require('yargs').argv;
const mongooseActions = require('./mongoose/Actions');

// clear the DB
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

} else if (argv['server-start']) { // start the server
  debug.action('Starting the server...');

  require('./express');
  require('./socket');
}
