import cloudinary from 'cloudinary';
import sharp from 'sharp';
import chalk from 'chalk';
import Base64 from '@ronomon/base64';
import { UploadNamespace, Optimize, ImageCacheNamespace, ImagesStore } from './cloudinary.types';

import { debug } from '../../config';

export class upload {
  // save all the necessary images and returns their URIs
  public static withItsThumb: UploadNamespace.WithItsThumb = (img, imgB64, draw, text) => new Promise((resolve, reject) => {
    debug.cloudinary('%o has been called', 'upload.withItsThumb');
    debug.cloudinary('Image to upload');
    debug.cloudinary('Thumb to upload');

    /**
     * by default we want 2 images
     * - the actual image
     * - its thumbnail
     */
    let imageNeeded = 2;
    // if there's a drawing image we want to save another image
    if (draw) {
      debug.cloudinary('Drawing to upload');
      ++imageNeeded;
    }
    // if there's a textual image we want to save another image
    if (text) {
      debug.cloudinary('Text to upload');
      ++imageNeeded;
    }

    const imageStore = new ImageCache(imageNeeded);

    debug.cloudinary('Uploading the image');
    // upload the main image
    upload.direct(imgB64)
      .then(imageData => {
        debug.cloudinary(chalk.green('The image has been uploaded'));
        imageStore.addImage('image', imageData.secure_url);

        if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
      })
      .catch(reject)

    debug.cloudinary('Making the thumbnail');
    // create a thumbnail based on the main image
    optimize(img)
      .then(thumbBuffer => {
        debug.cloudinary(chalk.green('The thumbnail has been made'));

        debug.cloudinary('Encoding the thumbnail');
        // transform the buffer into a base64 string
        const encodedBuffer = Base64.encode(thumbBuffer);
        const b64 = encodedBuffer.toString('ascii');
        debug.cloudinary(chalk.green('The thumbnail has been encoded'));

        debug.cloudinary('Uploading the thumbnail');
        // upload the thumbnail
        upload.direct(`data:image/webp;base64,${b64}`)
          .then(imageData => {
            debug.cloudinary(chalk.green('The thumbnail has been uploaded'));
            imageStore.addImage('thumb', imageData.secure_url);

            if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
          })
          .catch(reject)
      })
      .catch(reject)

    debug.cloudinary('Uploading the drawing');
    // upload the drawing image if any
    if (draw) {
      upload.direct(draw)
        .then(imageData => {
          debug.cloudinary(chalk.green('The drawing has been uploaded'));
          imageStore.addImage('draw', imageData.secure_url);

          if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
        })
        .catch(reject)
    }

    debug.cloudinary('Uploading the text');
    // upload the textual image if any
    if (text) {
      upload.direct(text)
        .then(imageData => {
          debug.cloudinary(chalk.green('The text has been uploaded'));
          imageStore.addImage('text', imageData.secure_url);

          if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
        })
        .catch(reject)
    }
  })

  // upload an image into cloudinary
  public static direct: UploadNamespace.Direct = image => cloudinary.v2.uploader.upload(image, { folder: 'dorg-gallery/' })
}

// used to create a thumbnail and decrease the size of its original image
const optimize: Optimize = file => sharp(file)
  // @ts-ignore; the resize function can take either an object or a number
  // but its type in the ts definitions is number only
  .resize({ height: 150 })
  .webp({ quality: 50 })
  .toBuffer();

class ImageCache extends ImageCacheNamespace.AbstractImageCache {

  private imageNeeded: number = 0;
  private number: number = 0;
  private images: ImagesStore = {
    image: '',
    thumb: '',
    draw: '',
    text: '',
  };

  public constructor(imageNeeded: number) {
    super();

    this.imageNeeded = imageNeeded;
  }

  public addImage: ImageCacheNamespace.AddImage = (type, image) => {
    this.images[type] = image;
    this.number++;
  }

  public hasEnoughImages: ImageCacheNamespace.HasEnoughImages = () => this.number === this.imageNeeded;

  public getImages: ImageCacheNamespace.GetImages = () => this.images;
}

exports.upload = upload;
