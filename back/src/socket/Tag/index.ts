import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocuments } from '../socket.types';

export class On {
  // is called when a user connect to the site
  public static getAllTags: SocketListener = function getAllTags(socket) {
    socket.on('getAllTags', () => {
      debug.socket.on('getAllTags');

      controllers.Tag.getAll()
        .then(tags => {
          debug.socket.on(debug.chalk.green('getAllTags success'));

          Emit.sendTags(socket, tags);
        })
        .catch(err => {
          console.error(err);

          Emit.getTagsFailed(socket, err);
        });
    });
  }

}

export class Emit {
  // used to send a response to the client
  public static sendTags: SocketSendDocuments = function sendTags(socket, tags) {
    debug.socket.emit('sendTags');

    socket.emit('sendTags', { success: true, tags: tags });
  }

  public static getTagsFailed: SocketErrorListener = function getTagsFailed(socket, error) {
    debug.socket.emit('getTagsFailed');

    socket.emit('getTagsFailed', { success: false, error: error });
  }
}
