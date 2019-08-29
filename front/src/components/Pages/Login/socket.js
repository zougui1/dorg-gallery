import socket from '../../../socket/config';

export class On {
  /**
   * called if the user can log in
   * @param {Function} callback
   */
  static loginSuccess = callback => {
    return socket.on('loginSuccess', callback);
  }

  /**
   * called if the user can't log in
   * @param {Function} callback
   */
  static loginFailed = callback => {
    return socket.on('loginFailed', callback);
  }
}

export class Emit {
  /**
   * called when the user submit the form with all the fields valid
   * @param {Object} data
   */
  static login = data => {
    return socket.emit('login', data);
  }
}

export class Remove {
  /**
   * called to remove the event listener
   * @param {Function} callback
   */
  static loginSuccess = callback => {
    return socket.removeListener('loginSuccess', callback);
  }

  /**
   * called to remove the event listener
   * @param {Function} callback
   */
  static loginFailed = callback => {
    return socket.removeListener('loginFailed', callback);
  }
}
