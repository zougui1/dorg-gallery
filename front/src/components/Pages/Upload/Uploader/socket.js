import socket from '../../../../socket/config';

class On {
  static uploadSuccess = callback => {
    return socket.on('uploadSuccess', callback);
  }

  static uploadFail = callback => {
    return socket.on('uploadFail', callback);
  }
}

class Emit {
  static uploadImage = data => {
    return socket.emit('uploadImage', data);
  }
}

class Remove {
  static uploadSuccess = callback => {
    return socket.removeListener('uploadSuccess', callback);
  }

  static uploadFail = callback => {
    return socket.removeListener('uploadFail', callback);
  }
}

export default {
  On,
  Emit,
  Remove
};
