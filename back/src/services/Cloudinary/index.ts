import cloudinary from 'cloudinary';
import sharp from 'sharp';
import Base64 from '@ronomon/base64';
import { UploadNamespace, Optimize, ImageCacheNamespace, ImagesStore } from './cloudinary.types';

export class upload {
  // save all the necessary images and returns their URIs
  public static withItsThumb: UploadNamespace.WithItsThumb = (img, imgB64, draw, text) => new Promise((resolve, reject) => {
    /**
     * by default we want 2 images
     * - the actual image
     * - its thumbnail
     */
    let imageNeeded = 2;
    // if there's a drawing image we want to save another image
    if (draw)++imageNeeded;
    // if there's a textual image we want to save another image
    if (text)++imageNeeded;

    const imageStore = new ImageCache(imageNeeded);

    // upload the main image
    upload.direct(imgB64)
      .then(imageData => {
        imageStore.addImage('image', imageData.secure_url);

        if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
      })
      .catch(reject)

    // create a thumbnail based on the main image
    optimize(img)
      .then(thumbBuffer => {
        // transform the buffer into a base64 string
        const encodedBuffer = Base64.encode(thumbBuffer);
        const b64 = encodedBuffer.toString('ascii');

        // upload the thumbnail
        upload.direct(`data:image/webp;base64,${b64}`)
          .then(imageData => {
            imageStore.addImage('thumb', imageData.secure_url);

            if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
          })
          .catch(reject)
      })
      .catch(reject)

    // upload the drawing image if any
    if (draw) {
      upload.direct(draw)
        .then(imageData => {
          imageStore.addImage('draw', imageData.secure_url);

          if(imageStore.hasEnoughImages()) resolve(imageStore.getImages());
        })
        .catch(reject)
    }

    // upload the textual image if any
    if (text) {
      upload.direct(text)
        .then(imageData => {
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
