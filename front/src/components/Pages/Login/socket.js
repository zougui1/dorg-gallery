import socket from '../../../socket/config';

export class On {
  static loginSuccess = callback => {
    return socket.on('loginSuccess', callback);
  }

  static loginFail = callback => {
    return socket.on('loginFail', callback);
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

  static loginFail = callback => {
    return socket.removeListener('loginFail', callback);
  }
}
