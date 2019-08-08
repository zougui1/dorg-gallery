const chalk = require('chalk');
const debug = require('debug');
// used for the namespace of debug
const appName = 'Dorg-gallery';

const namespaceCreator = namespaceName => name => namespaceName + ':' + name;

const namespace = namespaceCreator(appName);

const debugs = {};

debugs.appName = appName;
debugs.chalk = chalk;
// debug for the CLI actions
debugs.action = debug(namespace('action'));
// debug for the http server
debugs.http = debug(namespace('http'));
// debug for the https server
debugs.https = debug(namespace('https'));
// debug for things related to mongoose
debugs.mongoose = debug(namespace('mongoose'));
// debug for things related to socket.io
debugs.socket = debug(namespace('socket'));
// debug for the listeners with socket.io
debugs.socket.on = debug(namespace('socket:on'));
// debug for the emiters with socket.io
debugs.socket.emit = debug(namespace('socket:emit'));

global.debug = debugs;
module.exports = debugs;
