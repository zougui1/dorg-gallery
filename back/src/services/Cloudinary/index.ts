import cloudinary from 'cloudinary';
import sharp from 'sharp';
import { UploadNamespace, Optimize } from './cloudinary.types';

import { debug } from '../../config';
import { bufferToBase64 } from '../../utils';

export class Upload {
  /**
   * save all the necessary images and returns their URIs
   * @api public
   * @param {Buffer} img buffer of the main image, used to make the thumbnail
   * @param {String} imgB64 base64 string of the main image, used to upload to cloudinary
   * @param {String} draw base64 string of the drawing image, used to upload to cloudinary
   * @param {String} text base64 string of the text image, used to upload to cloudinary
   */
  public static withItsThumb: UploadNamespace.WithItsThumb = async (img, imgB64, draw, text) => {
    debug.cloudinary('%o has been called', 'upload.withItsThumb');
    debug.cloudinary('uploading to cloudinary...');

    const uploads = [
      // upload main image
      Upload.direct(imgB64),

      // upload the thumbnail
      Upload.makeAnUploadThumbnail(img),
    ];

    // upload the drawing image if any
    if (draw) {
      uploads.push(Upload.direct(draw));
    }

    // upload the textual image if any
    if (text) {
      uploads.push(Upload.direct(text));
    }

    const imagesArr = (await Promise.all(uploads)).map(d => d.secure_url);

    const images = {
      image: imagesArr[0],
      thumb: imagesArr[1],
      draw: imagesArr[2],
      text: imagesArr[3],
    };

    debug.cloudinary('The images got successfully uploaded to cloudinary');
    return images;
  }

  /**
   * upload an image into cloudinary
   * @api public
   * @param {String} image to upload into cloudinary
   * @returns {Promise<Object>}
   */
  public static direct: UploadNamespace.Direct = image => cloudinary.v2.uploader.upload(image, { folder: 'dorg-gallery/' })

  /**
   * make a thumbnail and upload it into cloudinary
   * @api public
   * @param {Buffer} image to use make a thumbnail to upload
   * @returns {Promise<Object>}
   */
  public static makeAnUploadThumbnail = async (image: Buffer): Promise<any> => {
    // create a thumbnail based on the main image
    const thumbBuffer = await optimize(image);

    // transform the buffer into a base64 string
    const b64 = bufferToBase64(thumbBuffer);

    // upload the thumbnail
    return Upload.direct(`data:image/webp;base64,${b64}`);
  }
}

/**
 * used to create a thumbnail and decrease the size of its original image
 * @param {Buffer} file to optimize
 * @returns {Promise<Buffer>}
 */
const optimize: Optimize = file => sharp(file)
  // @ts-ignore; the resize function can take either an object or a number
  // but its type in the ts definitions is number only
  .resize({ height: 150 })
  .webp({ quality: 50 })
  .toBuffer();
