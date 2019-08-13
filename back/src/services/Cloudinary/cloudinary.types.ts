export interface ImagesStore {
  image: string;
  thumb: string;
  draw: string;
  text: string;

  [key: string]: string;
}

export interface CloudinaryUploadResolve {
  secure_url: string;
}

// Upload class' methods type
export namespace UploadNamespace {
  export type WithItsThumb = (img: Buffer, imgB64: string, draw: string, text: string) => Promise<ImagesStore>;
  export type Direct = (image: string) => Promise<CloudinaryUploadResolve>;
}

// functions type
export type Optimize = (file: Buffer) => Promise<Buffer>;

// ImageCache class' methods type
export namespace ImageCacheNamespace {
  export type AddImage = (type: string, image: string) => void;
  export type HasEnoughImages = () => Boolean;
  export type GetImages = () => ImagesStore;

  export abstract class AbstractImageCache {
    abstract addImage: AddImage;
    abstract hasEnoughImages: HasEnoughImages;
    abstract getImages: GetImages;
  }
}
/*
export namespace ImageCache {
  export type AddImage = (type: string, image: string) => void;
  export type HasEnoughImages = () => Boolean;
  export type GetImages = () => ImagesStore;
}*/
