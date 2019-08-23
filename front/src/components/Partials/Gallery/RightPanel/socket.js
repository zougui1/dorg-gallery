import socket from '../../../../socket/config';

export class On {
  static sendImage = callback => {
    return socket.on('sendImage', callback);
  }

  static getImageFailed = callback => {
    return socket.on('getImageFailed', callback);
  }
}

export class Emit {
  static getImagesPage = data => {
    return socket.emit('getImagesPage', data);
  }
}

export class Remove {
  static sendImage = callback => {
    return socket.removeListener('sendImage', callback);
  }

  static getImageFailed = callback => {
    return socket.removeListener('getImageFailed', callback);
  }
}
