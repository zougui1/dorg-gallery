import { debug } from '../config';
import { SocketErrorListener } from '../socket/socket.types';

export function createErrorEmitter(name: string): SocketErrorListener {
  return (socket: SocketIO.Socket, error: string) => {
    debug.socket.emit(name);

    socket.emit(name, { success: false, error });
  }
}
