import socket from '../../../socket/config';

export class On {
  static loginSuccess = callback => {
    return socket.on('loginSuccess', callback);
  }

  static loginFailed = callback => {
    return socket.on('loginFailed', callback);
  }
}

export class Emit {
  static login = data => {
    return socket.emit('login', data);
  }
}

export class Remove {
  static loginSuccess = callback => {
    return socket.removeListener('loginSuccess', callback);
  }

  static loginFailed = callback => {
    return socket.removeListener('loginFailed', callback);
  }
}
