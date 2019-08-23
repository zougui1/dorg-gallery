import socket from '../../../socket/config';

export class On {
  static signupSuccess = callback => {
    return socket.on('signupSuccess', callback);
  }

  static signupFailed = callback => {
    return socket.on('signupFailed', callback);
  }
}

export class Emit {
  static signup = data => {
    return socket.emit('signup', data);
  }
}

export class Remove {
  static signupSuccess = callback => {
    return socket.removeListener('signupSuccess', callback);
  }

  static signupFailed = callback => {
    return socket.removeListener('signupFailed', callback);
  }
}
