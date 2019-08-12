const { controllers } = require('../mongoose');
const { upload } = require('../services/cloudinary');

const on = {
  // is called when a user upload an image
  uploadImage: function uploadImage(socket) {
    socket.on('uploadImage', data => {
      debug.socket.on('uploadImage');

      let { img, imgB64, imageTemp64, text, draw, tags } = data;

      img = img
        ? img
        : Buffer.from(imageTemp64.split(',')[1], 'base64');

      // upload all the necessary images into cloudinary
      upload.withItsThumb(img, imgB64 || imageTemp64, draw, text)
        .then(images => {
          // delete useless data
          delete data.imgB64;
          delete data.imageTemp64;
          delete data.text;
          delete data.draw;
          delete data.img;

          // add the tags in the database
          controllers.tag.addMultiple(tags)
            .then(tags => {

              const dataToUpload = {
                ...data,
                ...images,
                tags: [...tags],
              };

              // add the image in the database
              controllers.image.add(dataToUpload)
                .then(() => {
                  debug.socket.on(debug.chalk.green('uploadImage success'));

                  // send a successful response to the client
                  emit.private.imageUploaded(socket);
                })
                .catch(err => {
                  console.error(err);

                  // send an error to the client
                  emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
                });
            })
            .catch(err => {
              console.error(err);

              // send an error to the client
              emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
            });
        })
        .catch(err => {
          console.error(err);

          // send an error to the client
          emit.private.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
        });
    });
  },

  // is called when a user want to see images
  getImagesPage: function getImagesPage(socket) {
    socket.on('getImagesPage', data => {
      debug.socket.on('getImagesPage');

      controllers.image.getByPage(data)
        .then(images => {
          debug.socket.on(debug.chalk.green('getImagesPage success'));

          emit.private.sendImage(socket, images);
        })
        .catch(err => {
          console.error(err);

          emit.private.getImageFailed(socket, 'An error occured and no image couldn\'t be retrieved');
        });
    });
  },

  // is called when a user is in the page of a single image
  getImageById: function getImageById(socket) {
    socket.on('getImageById', data => {
      debug.socket.on('getImageById');

      controllers.image.getById(data)
        .then(image => {
          debug.socket.on(debug.chalk.green('getImageById success'));

          emit.private.sendImage(socket, image);
        })
        .catch(err => {
          console.error(err);

          emit.private.getImageFailed(socket, 'An error occured and the image couldn\'t be retrieved');
        });
    });
  },

  getImagesCount: function getImagesCount(socket) {
    socket.on('getImagesCount', data => {
      debug.socket.on('getImagesCount');

      controllers.image.getCount(data)
        .then(count => {
          debug.socket.on(debug.chalk.green('getImagesCount success'));

          emit.private.sendImagesCount(socket, count);
        })
        .catch(err => {
          console.error(err);

          emit.private.getImagesCountFailed(socket, 'An error occured and the amount of images couldn\'t be retrieved');
        });
    });
  },
};

const emit = {
  // used to send a response to the client
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
};

module.exports = {
  on: on,
  emit: emit.public,
};
