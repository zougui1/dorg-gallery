import { debug } from '../../../config';
import { Image } from '../../Models/Image';
import { Add, GetByPage, GetByUser, GetById, GetCount, IImageController } from './image.types';

const imagePerPage = 30;

export const ImageController: IImageController = class ImageController {

  /**
   * add an image in the DB
   */
  public static add: Add = ({ link, thumb, canvas, tags, property, artist, characterName, user, description }) => {
    debug.mongoose('%o has been called', 'ImageController.add');

    const image = new Image({
      // @ts-ignore
      link: link,
      thumb: thumb,
      canvas: {
        draw: canvas.draw,
        text: canvas.text,
      },
      tags: tags.map(t => t._id),
      property: property,
      artist: {
        name: artist.name,
        link: artist.link,
      },
      characterName: characterName,
      user: user._id,
      description: description,
    });

    return image.save();
  }

  /**
   * get images in a page depending of the tags, the page and the property
   */
  public static getByPage: GetByPage = (tags, page, property) => {
    debug.mongoose('%o has been called', 'ImageController.getByPage');

    tags = tags.length > 0 ? tags : ['*'];
    const inTags = { $in: tags };
    let query;

    if (tags.length === 1 && tags[0] === '*') {
      query = Image.find({
        property: { $in: property },
        /**
         *  perform a query using the tags for
         *  - the name of all tags linked to the image
         *  - the name of the user who posted it
         *  - the name of the artist who made the image
         *  - the link to the artist who made the image
         *  - the character's name who is represented in the image
         */
        $and: [
          { $or: [
            { 'tags.$[].name': inTags },
            { 'user.name': inTags },
            { 'artist.name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'artist.name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'characterName': inTags },
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
          ]},
          { $or: [
            { 'characterName': inTags },
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
          ]},
        ]
      });
    } else {
      query = Image.find();
    }

    return query
      .skip((page - 1) * imagePerPage) // start to get the images depending of the given page
      .limit(imagePerPage) // limit the number of image to get
      .populate('user', 'name') // get only the name of the user who posted the image
      .sort({ _id: -1 }); // order by date by DESC
  }

  /**
   * get a page of images posted by a user
   */
  public static getByUser: GetByUser = (user, page) => {
    debug.mongoose('%o has been called', 'ImageController.getByUser');

    return Image
      .find({ 'user.name': user.name })
      .skip((page - 1) * imagePerPage)
      .limit(imagePerPage)
      .populate('user', 'name')
      .sort({ _id: -1 });
  }

  /**
   * get an image by its ID
   */
  public static getById: GetById = id => {
    debug.mongoose('%o has been called', 'ImageController.getById');

    return Image.findById(id).populate('user', 'name');
  }

  /**
   * get the amount of images
   */
  public static getCount: GetCount = (user, tags) => {
    debug.mongoose('%o has been called', 'ImageController.getCount');

    tags = tags.length > 0 ? tags : ['*'];

    return Image.countDocuments({ 'user.name': user.name, 'tags.$[].name': { $in: tags } });
  }

}
