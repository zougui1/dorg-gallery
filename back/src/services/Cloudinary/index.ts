import cloudinary from 'cloudinary';
import sharp from 'sharp';
import chalk from 'chalk';
import Base64 from '@ronomon/base64';
import { UploadNamespace, Optimize, ImageCacheNamespace, ImagesStore } from './cloudinary.types';

import { debug } from '../../config';

export class upload {
  // save all the necessary images and returns their URIs
  public static withItsThumb: UploadNamespace.WithItsThumb = async (img, imgB64, draw, text) => {
    debug.cloudinary('%o has been called', 'upload.withItsThumb');
    debug.cloudinary('uploading to cloudinary...');

    /**
     * by default we want 2 images
     * - the actual image
     * - its thumbnail
     */
    let imageNeeded = 2;
    // if there's a drawing image we want to save another image
    if (draw) {
      ++imageNeeded;
    }
    // if there's a textual image we want to save another image
    if (text) {
      ++imageNeeded;
    }

    const imageStore = new ImageCache(imageNeeded);

    // upload the main image
    const mainImageData = await upload.direct(imgB64);
    imageStore.addImage('image', mainImageData.secure_url);

    // create a thumbnail based on the main image
    const thumbBuffer = await optimize(img);

    // transform the buffer into a base64 string
    const encodedBuffer = Base64.encode(thumbBuffer);
    const b64 = encodedBuffer.toString('ascii');

    // upload the thumbnail
    const thumbImageData = await upload.direct(`data:image/webp;base64,${b64}`);
    imageStore.addImage('thumb', thumbImageData.secure_url);

    // upload the drawing image if any
    if (draw) {
      const drawingImageData = await upload.direct(draw);
      imageStore.addImage('draw', drawingImageData.secure_url);
    }

    // upload the textual image if any
    if (text) {
      const textImageData = await upload.direct(text);
      imageStore.addImage('text', textImageData.secure_url);
    }

    debug.cloudinary('The images got successfully uploaded to cloudinary');
    return imageStore.getImages();
  }

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
