import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { upload } from '../../services/cloudinary';
import { SocketListener, SocketErrorListener, SocketAndNumber, SendImage } from './image.types';

class On {
  // is called when a user upload an image
  public static uploadImage: SocketListener = function uploadImage(socket) {
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
          controllers.Tag.addMultiple(tags)
            .then(tagsData => {

              const dataToUpload = {
                ...data,
                ...images,
                tags: [...tagsData.tags],
              };

              // add the image in the database
              controllers.Image.add(dataToUpload)
                .then(() => {
                  debug.socket.on(debug.chalk.green('uploadImage success'));

                  // send a successful response to the client
                  Emit.imageUploaded(socket);
                })
                .catch(err => {
                  console.error(err);

                  // send an error to the client
                  Emit.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
                });
            })
            .catch(err => {
              console.error(err);

              // send an error to the client
              Emit.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
            });
        })
        .catch(err => {
          console.error(err);

          // send an error to the client
          Emit.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');
        });
    });
  }

  // is called when a user want to see images
  public static getImagesPage: SocketListener = function getImagesPage(socket) {
    socket.on('getImagesPage', data => {
      debug.socket.on('getImagesPage');

      controllers.Image.getByPage(data.tags, data.page, data.property)
        .then(images => {
          debug.socket.on(debug.chalk.green('getImagesPage success'));

          Emit.sendImage(socket, images);
        })
        .catch(err => {
          console.error(err);

          Emit.getImageFailed(socket, 'An error occured and no image couldn\'t be retrieved');
        });
    });
  }

  // is called when a user is in the page of a single image
  public static getImageById: SocketListener = function getImageById(socket) {
    socket.on('getImageById', data => {
      debug.socket.on('getImageById');

      controllers.Image.getById(data.id)
        .then(image => {
          debug.socket.on(debug.chalk.green('getImageById success'));

          Emit.sendImage(socket, image);
        })
        .catch(err => {
          console.error(err);

          Emit.getImageFailed(socket, 'An error occured and the image couldn\'t be retrieved');
        });
    });
  }

  public static getImagesCount: SocketListener = function getImagesCount(socket) {
    socket.on('getImagesCount', data => {
      debug.socket.on('getImagesCount');

      controllers.Image.getCount(data.user, data.tags)
        .then(count => {
          debug.socket.on(debug.chalk.green('getImagesCount success'));

          Emit.sendImagesCount(socket, count);
        })
        .catch(err => {
          console.error(err);

          Emit.getImagesCountFailed(socket, 'An error occured and the amount of images couldn\'t be retrieved');
        });
    });
  }
};

class Emit {
  public static imageUploaded: SocketListener = function imageUploaded(socket) {
    debug.socket.emit('imageUploaded');

    socket.emit('imageUploaded', { success: true });
  }

  public static imageUploadFailed: SocketErrorListener = function imageUploadFailed(socket, error) {
    debug.socket.emit('imageUploadFailed');

    socket.emit('imageUploadFailed', { success: false, error: error });
  }

  public static sendImage: SendImage = function sendImage(socket, image) {
    debug.socket.emit('sendImage');

    let propName = Array.isArray(image)
      ? 'images'
      : 'image';

    socket.emit('sendImage', { success: true, [propName]: image });
  }

  public static getImageFailed: SocketErrorListener = function getImageFailed(socket, error) {
    debug.socket.emit('getImageFailed');

    socket.emit('getImageFailed', { success: false, error: error });
  }

  public static sendImagesCount: SocketAndNumber = function sendImagesCount(socket, count) {
    debug.socket.emit('sendImagesCount');

    socket.emit('sendImagesCount', { success: true, count: count });
  }

  public static getImagesCountFailed: SocketErrorListener = function getImagesCountFailed(socket, error) {
    debug.socket.emit('getImagesCountFailed');

    socket.emit('getImagesCountFailed', { success: false, error: error });
  }
};

export { On, Emit };
