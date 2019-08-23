import socket from '../../../socket/config';

export class On {
  static sendImage = callback => {
    return socket.on('sendImage', d => {
      console.log('sentImage triggered');
      callback(d);
    });
  }

  static getImageFailed = callback => {
    return socket.on('getImageFailed', callback);
  }

  static sendImagesCount = callback => {
    return socket.on('sendImagesCount', callback);
  }

  static getImagesCountFailed = callback => {
    return socket.on('getImagesCountFailed', callback);
  }
}

export class Emit {
  static getImagesPage = data => {
    return socket.emit('getImagesPage', data);
  }

  static getImagesCount = data => {
    return socket.emit('getImagesCount', data);
  }
}

export class Remove {
  static sendImage = callback => {
    return socket.removeListener('sendImage', callback);
  }

  static getImageFailed = callback => {
    return socket.removeListener('getImageFailed', callback);
  }

  static sendImagesCount = callback => {
    return socket.removeListener('sendImagesCount', callback);
  }

  static getImagesCountFailed = callback => {
    return socket.removeListener('getImagesCountFailed', callback);
  }
}
