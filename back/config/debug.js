const chalk = require('chalk');
const debug = require('debug');
const appName = 'Dorg-gallery';
const namespaceName = appName;

const namespaceCreator = namespaceName => name => namespaceName + ':' + name;

const namespace = namespaceCreator(namespaceName);

const debugs = {};

debugs.appName = appName;
debugs.chalk = chalk;
debugs.action = debug(namespace('action'));
debugs.http = debug(namespace('http'));
debugs.https = debug(namespace('https'));
debugs.mongoose = debug(namespace('mongoose'));
debugs.socket = debug(namespace('socket'));
debugs.socket.on = debug(namespace('socket:on'));
debugs.socket.emit = debug(namespace('socket:emit'));

global.debug = debugs;
module.exports = debugs;
