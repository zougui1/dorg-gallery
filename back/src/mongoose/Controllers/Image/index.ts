import _ from 'lodash';
import { debug } from '../../../config';
import { Image } from '../../Models/Image';
import { IImageController, Add, GetByPage, SearchOptions, GetById, GetCount } from './image.types';

const imagePerPage = 30;

export const ImageController: IImageController = class ImageController {

  /**
   * add an image in the DB
   * @api public
   * @param {Object} destructured
   * @param {String} destructured.link link to the main image
   * @param {String} destructured.thumb link to the thumbnail
   * @param {Object} destructured.canvas
   * @param {String} destructured.canvas.text link to the text image
   * @param {String} destructured.canvas.draw link to the drawing image
   * @param {TagModel[]} destructured.tags tags of the image
   * @param {String[]} destructured.rate rate of the image
   * @param {Object} destructured.artist info of the artist who drew the image
   * @param {String} destructured.artist.name name of the artist
   * @param {String} destructured.artist.link link to the artist
   * @param {String} destructured.characterName name of the character in the image
   * @param {UserModel} destructured.user data of the user who posted the image
   * @param {String} destructured.description description of the image
   * @returns {Promise<Document>}
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
   * TODO make a function to get the query used in this method. to make a method that'll get
   * TODO the count of the images it can returns
   * get images in a page depending of the tags, the page and the rate
   * @api public
   * @param {TagModel[]} tags tags to search in the images
   * @param {Number} page define the range of images to get
   * @param {UserModel} user the user who is querying
   * @param {ISearchOptions} searchOptions the options of the query to make more complex query
   * @param {String[]} searchOptions.search the tags name, used to improve the relevancy of the images
   * @param {SearchOptions.Match} searchOptions.match contains more data to condition for a more complex and relevant query
   * @param {SearchOptions.User} searchOptions.match.user data to match with the poster's user data
   * @param {String} searchOptions.match.user.slug slug to test with the slug of the poster
   * @param {SearchOptions.HaveOverlays} searchOptions.haveOverlays data used to get the images that have overlays
   * @param {SearchOptions.Rating} searchOptions.rating rating of the image
   * @param {SearchOptions.Sort} searchOptions.sort contains data to define the sorting
   * @param {SearchOptions.Criteria} searchOptions.criteria criteria of the sorting
   * @param {SearchOptions.Order} searchOptions.order the order of the sorting
   * @returns {DocumentQuery<Document [], Document, {}>}
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
      if (!haveOverlays.includes(SearchOptions.HaveOverlays.text)) {
        canvasQuery['canvas.text'] = '';
      } else {
        canvasQuery['canvas.text'] = { $exists: true, $ne: '' };
      }

      // query on the drawing canvas
      if (!haveOverlays.includes(SearchOptions.HaveOverlays.draw)) {
        canvasQuery['canvas.draw'] = '';
      } else {
        canvasQuery['canvas.draw'] = { $exists: true, $ne: '' };
      }

      // general query
      if (haveOverlays.includes(SearchOptions.HaveOverlays['*'])) {
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
   * get an image by its ID
   * @api public
   * @param {String} id the id of the image to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static getById: GetById = id => {
    debug.mongoose('%o has been called', 'ImageController.getById');

    return Image.findById(id).populate('user', 'name');
  }

  /**
   * TODO improve this method to use all the parameters the 'getByPage' can use
   * get the amount of images
   */
  public static getCount: GetCount = (user, tags) => {
    debug.mongoose('%o has been called', 'ImageController.getCount');

    tags = tags.length > 0 ? tags : ['*'];

    return Image.countDocuments({ 'user.name': user.name, 'tags.$[].name': { $in: tags } });
  }

}
