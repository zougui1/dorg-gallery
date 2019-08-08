import socket from '../../../../socket/config';

const on = {
  uploadSuccess: callback => {
    return socket.on('uploadSuccess', callback);
  },

  uploadFail: callback => {
    return socket.on('uploadFail', callback);
  },
};

const emit = {
  uploadImage: data => {
    return socket.emit('uploadImage', data);
  },
};

const remove = {
  uploadSuccess: callback => {
    return socket.removeListener('uploadSuccess', callback);
  },

  uploadFail: callback => {
    return socket.removeListener('uploadFail', callback);
  },
};

export default {
  on,
  emit,
  remove
};
