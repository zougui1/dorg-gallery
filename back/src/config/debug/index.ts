import chalk from 'chalk';
import debug from 'debug';
import { Dorg } from './debug.types';
// used for the namespace of debug
const appName = 'Dorg-gallery';

const namespaceCreator = (namespaceName: string) => (name: string) => namespaceName + ':' + name;

const namespace = namespaceCreator(appName);

const debugs: Dorg.Debug = {
  appName: appName,
  chalk: chalk,
  // debug for the CLI actions
  action: debug(namespace('action')),
  // debug for the http server
  http: debug(namespace('http')),
  // debug for the https server
  https: debug(namespace('https')),
  // debug for things related to mongoose
  mongoose: debug(namespace('mongoose')),
  // debug for things related to socket.io
  socket: {
    ...debug(namespace('socket')),
    // debug for the listeners with socket.io
    on: debug(namespace('socket:on')),
    // debug for the emiters with socket.io
    emit: debug(namespace('socket:emit')),
  },
};

export { debugs as debug };
