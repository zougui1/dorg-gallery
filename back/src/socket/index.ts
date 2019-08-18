import { io, debug } from '../config';
import * as UserHandlers from './User';
import * as ImageHandlers from './Image';
import * as TagHandlers from './Tag';

let socketHandlers: any[] = [];

socketHandlers.push(UserHandlers);
socketHandlers.push(ImageHandlers);
socketHandlers.push(TagHandlers);

io.on('connection', socket => {
  debug.socket('connection');

  for (let i = 0; i < socketHandlers.length; i++) {
    const handler = socketHandlers[i];

    if (typeof handler !== 'object') {
      continue;
    }

    if (typeof handler.on === 'object') {
      for (const methodName in handler.on) {
        const method = handler.on[methodName];

        if (typeof method !== 'function') {
          continue;
        }

        method(socket);
      }
    }

    if (typeof handler.emit === 'object') {
      for (const methodName in handler.emit) {
        const method = handler.emit[methodName];

        if (typeof method !== 'function') {
          continue;
        }

        method(socket);
      }
    }
  }
});
