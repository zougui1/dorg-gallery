import socket from '../../../socket/config';

class On {
  static editUserDataSuccess = callback => {
    return socket.on('editUserDataSuccess', callback);
  }

  static editUserDataFail = callback => {
    return socket.on('editUserDataFail', callback);
  }
}

class Emit {
  static editUserData = data => {
    return socket.emit('editUserData', data);
  }
}

class Remove {
  static editUserDataSuccess = callback => {
    return socket.removeListener('editUserDataSuccess', callback);
  }

  static editUserDataFail = callback => {
    return socket.removeListener('editUserDataFail', callback);
  }
}

export default {
  On,
  Emit,
  Remove
};
