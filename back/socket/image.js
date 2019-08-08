const { controllers } = require('../mongoose');
const { upload } = require('../services/cloudinary');

const handlers = {
  on: {
    uploadImage: function uploadImage(socket) {
      socket.on('uploadImage', data => {
        debug.socket.on('uploadImage');

        let { img, imgB64, imageTemp64, text, draw, tags } = data;

        img = img
          ? img
          : Buffer.from(imageTemp64.split(',')[1], 'base64');

        upload.withItsThumb(img, imgB64 || imageTemp64, draw, text)
          .then(images => {
            delete data.imgB64;
            delete data.imageTemp64;
            delete data.text;
            delete data.draw;
            delete data.img;

            controllers.tag.addMultiple(tags)
              .then(tags => {

                const dataToUpload = {
                  ...data,
                  ...images,
                  tags: [...tags],
                };

                controllers.image.add(dataToUpload)
                  .then(() => {
                    debug.socket.on(debug.chalk.green('uploadImage success'));

                    handlers.emit.private.imageUploaded(socket);
                  })
                  .catch(err => {
                    console.error(err);

                    handlers.emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
                  });
              })
              .catch(err => {
                console.error(err);

                handlers.emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
              });
          })
          .catch(err => {
            console.error(err);

            handlers.emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
          });
      });
    },

    getImagesPage: function getImagesPage(socket) {
      socket.on('getImagesPage', data => {
        debug.socket.on('getImagesPage');

        controllers.image.getByPage(data)
          .then(images => {
            debug.socket.on(debug.chalk.green('getImagesPage success'));

            handlers.emit.private.sendImage(socket, images);
          })
          .catch(err => {
            console.error(err);

            handlers.emit.private.getImageFailed(socket, 'An error occured and no image couldn\'t be retrieved');
          });
      });
    },

    getImageById: function getImageById(socket) {
      socket.on('getImageById', data => {
        debug.socket.on('getImageById');

        controllers.image.getById(data)
          .then(image => {
            debug.socket.on(debug.chalk.green('getImageById success'));

            handlers.emit.private.sendImage(socket, image);
          })
          .catch(err => {
            console.error(err);

            handlers.emit.private.getImageFailed(socket, 'An error occured and the image couldn\'t be retrieved');
          });
      });
    },

    getImagesCount: function getImagesCount(socket) {
      socket.on('getImagesCount', data => {
        debug.socket.on('getImagesCount');

        controllers.image.getCount(data)
          .then(count => {
            debug.socket.on(debug.chalk.green('getImagesCount success'));

            handlers.emit.private.sendImagesCount(socket, count);
          })
          .catch(err => {
            console.error(err);

            handlers.emit.private.getImagesCountFailed(socket, 'An error occured and the amount of images couldn\'t be retrieved');
          });
      });
    },
  },

  emit: {
    private: {
      imageUploaded: function imageUploaded(socket) {
        debug.socket.emit('imageUploaded');

        socket.emit('imageUploaded', { success: true });
      },

      imageUploadFailed: function imageUploadFailed(socket, error) {
        debug.socket.emit('imageUploadFailed');

        socket.emit('imageUploadFailed', { success: false, error: error });
      },

      sendImage: function sendImage(socket, image) {
        debug.socket.emit('sendImage');

        let propName = Array.isArray(image)
          ? 'images'
          : 'image';

        socket.emit('sendImage', { success: true, [propName]: image });
      },

      getImageFailed: function getImageFailed(socket, error) {
        debug.socket.emit('getImageFailed');

        socket.emit('getImageFailed', { success: false, error: error });
      },

      sendImagesCount: function sendImagesCount(socket, count) {
        debug.socket.emit('sendImagesCount');

        socket.emit('sendImagesCount', { success: true, count: count });
      },

      getImagesCountFailed: function getImagesCountFailed(socket, error) {
        debug.socket.emit('getImagesCountFailed');

        socket.emit('getImagesCountFailed', { success: false, error: error });
      },
    },
  }
};

module.exports = {
  on: handlers.on,
  emit: handlers.emit.public,
};
