import socket from '../../../../socket/config';

class On {
  static imageUploaded = callback => {
    return socket.on('imageUploaded', callback);
  }

  static imageUploadFailed = callback => {
    return socket.on('imageUploadFailed', callback);
  }
}

class Emit {
  static uploadImage = data => {
    return socket.emit('uploadImage', data);
  }
}

class Remove {
  static imageUploaded = callback => {
    return socket.removeListener('imageUploaded', callback);
  }

  static imageUploadFailed = callback => {
    return socket.removeListener('imageUploadFailed', callback);
  }
}

export default {
  On,
  Emit,
  Remove
};
