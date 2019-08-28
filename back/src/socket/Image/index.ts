import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { Upload } from '../../services/Cloudinary';
import { SocketListener, SocketErrorListener } from '../socket.types';
import { SocketAndNumber, SendImage } from './image.types';

export class On {
  /**
   * is called when a user upload an image
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static uploadImage: SocketListener = function uploadImage(socket) {
    socket.on('uploadImage', async (data: any) => {
      debug.socket.on('uploadImage');

      let { img, imgB64, imageBase64, text, draw, tags } = data;

      try {
        img = img
          ? img
          : Buffer.from(imageBase64.split(',')[1], 'base64');

        // upload all the necessary images into cloudinary
        const images = await Upload.withItsThumb(img, imgB64 || imageBase64, draw, text);

        // delete useless data
        delete data.imgB64;
        delete data.imageTemp64;
        delete data.imageBase64;
        delete data.text;
        delete data.draw;
        delete data.img;
        console.log(data)

        // add the tags in the database
        const tagsData = await controllers.Tag.addMultiple(tags);

        const dataToUpload = {
          ...data,
          ...images,
          canvas: {
            draw: images.draw,
            text: images.text,
          },
          link: images.image,
          tags: [...tagsData.documents],
        };

        // add the image in the database
        await controllers.Image.add(dataToUpload);
      } catch (err) {
        // send an error to the client
        Emit.imageUploadFailed(socket, 'An error occured and your image couldn\'t be uploaded');

        throw new Error(err);
      }

      debug.socket.on(debug.chalk.green('uploadImage success'));
      // send a successful response to the client
      Emit.imageUploaded(socket);
    });
  }

  /**
   * is called when a user want to see images
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static getImagesPage: SocketListener = function getImagesPage(socket) {
    socket.on('getImagesPage', async (data: any) => {
      debug.socket.on('getImagesPage');

      console.log(data);
      try {
        // get the tags the user is looking for
        const { documents } = await controllers.Tag.getMultipleByName(data.tags);

        // if there is less tags found than tags wanting
        // this means that no image has the wanting tags
        // so there is no image to return
        if (documents.length < data.tags.length) {
          Emit.sendImage(socket, []);
          return;
        }

        // get the user who posted the images that the user is looking for
        const user = await controllers.User.findBySlug(data.searchOptions.match.user.slug);

        // if there is no user with the given slug
        // this mean there is no image to return
        if (!user) {
          Emit.sendImage(socket, []);
          return;
        }

        data.searchOptions.match.userData = user;
        data.searchOptions.tags = data.tags;

        // get the images
        const images = await controllers.Image.getByPage(documents.map(t => t._id), data.page, data.user, data.searchOptions);

        debug.socket.on(debug.chalk.green('getImagesPage success'));
        Emit.sendImage(socket, images);
      } catch (err) {
        Emit.getImageFailed(socket, 'An error occured and no image couldn\'t be retrieved');

        throw new Error(err);
      }
    });
  }

  /**
   * is called when a user is in the page of a single image
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static getImageById: SocketListener = function getImageById(socket) {
    socket.on('getImageById', async (data: any) => {
      debug.socket.on('getImageById');

      try {
        const image = await controllers.Image.getById(data.id);

        debug.socket.on(debug.chalk.green('getImageById success'));
        Emit.sendImage(socket, image);
      } catch (err) {
        Emit.getImageFailed(socket, 'An error occured and the image couldn\'t be retrieved');

        throw new Error(err);
      }
    });
  }

  /**
   * is called when a user is querying a gallery
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static getImagesCount: SocketListener = function getImagesCount(socket) {
    socket.on('getImagesCount', async (data: any) => {
      debug.socket.on('getImagesCount');

      try {
        const count = await controllers.Image.getCount(data.user, data.tags);

        debug.socket.on(debug.chalk.green('getImagesCount success'));

        Emit.sendImagesCount(socket, count);
      } catch (err) {
        Emit.getImagesCountFailed(socket, 'An error occured and the amount of images couldn\'t be retrieved');

        throw new Error(err);
      }
    });
  }
}

export class Emit {
  /**
   * is called when an image has been successfully uploaded
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static imageUploaded: SocketListener = function imageUploaded(socket) {
    debug.socket.emit('imageUploaded');

    socket.emit('imageUploaded', { success: true });
  }

  /**
   * is called when an error occured while uploading an image
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static imageUploadFailed: SocketErrorListener = function imageUploadFailed(socket, error) {
    debug.socket.emit('imageUploadFailed');

    socket.emit('imageUploadFailed', { success: false, error: error });
  }

  /**
   * is called to send one or more images to the client
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static sendImage: SendImage = function sendImage(socket, image) {
    debug.socket.emit('sendImage');

    let propName = Array.isArray(image)
      ? 'images'
      : 'image';

    socket.emit('sendImage', { success: true, [propName]: image });
  }

  /**
   * is called when an error occured while searching one or more image
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static getImageFailed: SocketErrorListener = function getImageFailed(socket, error) {
    debug.socket.emit('getImageFailed');

    socket.emit('getImageFailed', { success: false, error: error });
  }

  /**
   * send the amount of images found by the query of the user
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static sendImagesCount: SocketAndNumber = function sendImagesCount(socket, count) {
    debug.socket.emit('sendImagesCount');

    socket.emit('sendImagesCount', { success: true, count: count });
  }

  /**
   * is called when an error occured while searching for the amount of images
   * that could be found by the query of the user
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static getImagesCountFailed: SocketErrorListener = function getImagesCountFailed(socket, error) {
    debug.socket.emit('getImagesCountFailed');

    socket.emit('getImagesCountFailed', { success: false, error: error });
  }
}
