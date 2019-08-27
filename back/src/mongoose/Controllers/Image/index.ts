import _ from 'lodash';
import { debug } from '../../../config';
import { Image } from '../../Models/Image';
import { Add, GetByPage, GetByUser, GetById, GetCount, IImageController } from './image.types';

const imagePerPage = 30;

export const ImageController: IImageController = class ImageController {

  /**
   * add an image in the DB
   */
  public static add: Add = ({ link, thumb, canvas, tags, rate, artist, characterName, user, description }) => {
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
      rate: rate,
      artist: {
        name: artist.name || 'unknown',
        link: artist.link,
      },
      characterName: characterName || 'unknown',
      user: user._id,
      description: description,
    });

    return image.save();
  }

  /**
   * get images in a page depending of the tags, the page and the rate
   */
  public static getByPage: GetByPage = (tags, page, user, searchOptions) => {
    debug.mongoose('%o has been called', 'ImageController.getByPage');

    //tags = tags.length > 0 ? tags : ['*'];
    //tags[tags.length] = '*';
    const inTags = { $in: tags };
    const allTags = {  name: { $in: tags } };
    let query;
    console.log(tags);

    const getCanvas = () => {
      const { haveOverlays } = searchOptions;
      let canvasQuery: any = {};

      // query on the text canvas
      if (!haveOverlays.includes('text')) {
        canvasQuery['canvas.text'] = '';
      } else {
        canvasQuery['canvas.text'] = { $exists: true, $ne: '' };
      }

      // query on the drawing canvas
      if (!haveOverlays.includes('draw')) {
        canvasQuery['canvas.draw'] = '';
      } else {
        canvasQuery['canvas.draw'] = { $exists: true, $ne: '' };
      }

      // general query
      if (haveOverlays.includes('*')) {
        canvasQuery = {}; // reset the data it contains
        canvasQuery.canvas = { $exists: true };
      }

      return canvasQuery;
    }

    // improve the request
    // if the user send a request with "test" in the search input
    // all the images matching the '$and' command are returned
    return Image.find({
      //rate: { $in: searchOptions.rating },
      /**
       *  perform a query using the tags for
       *  - the name of all tags linked to the imagça fait un backtracking
       *  - the name of the user who posted it
       *  - the name of the artist who made the image
       *  - the link to the artist who made the image
       *  - the character's name who is represented in the image
       */
      //tags: { $all: tags },
      //user: searchOptions.match.userData._id,
      'tags.name': { $exists: false }
      //'tags.name': { $ne: '*' }
      //...getCanvas(),
      /*$and: [
        { $or: [
          { 'artist.name': { $in: searchOptions.tags } },
          { 'artist.link': { $in: searchOptions.tags } },
          { 'characterName': { $in: searchOptions.tags } },
          { _id: { $exists: true } }, // used to make the operator optional
        ]},
        { $or: [
          { 'artist.name': { $in: searchOptions.tags } },
          { 'artist.link': { $in: searchOptions.tags } },
          { 'characterName': { $in: searchOptions.tags } },
          { _id: { $exists: true } }, // used to make the operator optional
        ]},
        { $or: [
          { 'artist.link': { $in: searchOptions.tags } },
          { 'characterName': { $in: searchOptions.tags } },
          { 'artist.name': { $in: searchOptions.tags } },
          { _id: { $exists: true } }, // used to make the operator optional
        ]},
      ]*/
    })
      .skip((page - 1) * imagePerPage) // start to get the images depending of the given page
      .limit(imagePerPage) // limit the number of image to get
      .populate('user', '-password') // get only the name of the user who posted the image
      .populate('tags') // populate tags
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
