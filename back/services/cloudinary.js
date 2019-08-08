const cloudinary = require('cloudinary');
const sharp = require('sharp');
const Base64 = require('@ronomon/base64');

const upload = {
  // save all the necessary images and returns their URIs
  withItsThumb: (img, imgB64, draw, text) => new Promise((resolve, reject) => {
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

    const imageStore = tempImageStore(imageNeeded);

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
  }),

  simple: img => new Promise((resolve, reject) => {
    upload.direct(img)
      .then(imageData => resolve({ image: imageData.secure_url }))
      .catch(reject);
  }),

  // upload an image into cloudinary
  direct: image => cloudinary.v2.uploader.upload(image, { folder: 'dorg-gallery/' }),
}

// used to create a thumbnail and decrease the size of its original image
const optimize = file => sharp(file)
  .resize({ height: 150 })
  .webp({ quality: 50 })
  .toBuffer();

const tempImageStore = imageNeeded => {
  let i = 0;
  let images = {};

  return {
    addImage: (type, image) => {
      images[type] = image;
      ++i;
    },
    hasEnoughImages: () => i === imageNeeded,
    getImages: () => images,
  };
}

exports.upload = upload;
