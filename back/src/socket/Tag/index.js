const { controllers } = require('../mongoose');


const on = {
  getAllTags: function getAllTags(socket) {
    socket.on('getAllTags', () => {
      debug.socket.on('getAllTags');

      controllers.tag.getAll()
        .then(tags => {
          debug.socket.on(debug.chalk.green('getAllTags success'));

          emit.private.sendTags(socket, tags);
        })
        .catch(err => {
          console.error(err);

          emit.private.getTagsFailed(socket, data);
        });
    });
  },
};

const emit = {
  // used to send a response to the client
  private: {
    sendTags: function sendTags(socket, tags) {
      debug.socket.emit('sendTags');

      socket.emit('sendTags', { success: true, tags: tags });
    },

    getTagsFailed: function getTagsFailed(socket, error) {
      debug.socket.emit('getTagsFailed');

      socket.emit('getTagsFailed', { success: false, error: error });
    },
  },
};

module.exports = {
  on: on,
  emit: emit.public,
};
