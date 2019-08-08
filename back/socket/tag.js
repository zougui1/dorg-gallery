const { controllers } = require('../mongoose');

const handlers = {
  on: {
    getAllTags: function getAllTags(socket) {
      socket.on('getAllTags', () => {
        debug.socket.on('getAllTags');

        controllers.tag.getAll()
          .then(tags => {
            debug.socket.on(debug.chalk.green('getAllTags success'));

            handlers.emit.private.sendTags(socket, tags);
          })
          .catch(err => {
            console.error(err);

            handlers.emit.private.getTagsFailed(socket, data);
          });
      });
    },
  },

  emit: {
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
  }
};

module.exports = {
  on: handlers.on,
  emit: handlers.emit.public,
};
