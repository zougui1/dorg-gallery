import _ from 'lodash';
import { debug } from '../../../config';
import { Image } from '../../Models/Image';
import { IImageController, Add, GetByPage, SearchOptions, GetById, GetCount, ImageQuery } from './image.types';
import { QueryParser } from '../../../services/QueryParser';

const imagePerPage = 30;

const imageQuery: ImageQuery = function imageQuery (tags, user, searchOptions) {
  debug.mongoose('%o has been called', 'ImageController.getByPage');

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
    }

    return canvasQuery;
  }

  return {
    rate: { $in: searchOptions.rating },
    user: searchOptions.match.userData._id,
    tags: { $all: tags },
    ...getCanvas(),
  };
}

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
  public static add: Add = ({ link, thumb, canvas, tags, rate, artist, user, description, title }) => {
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
      user: user._id,
      description: description,
      title: title,
    });

    return image.save();
  }

  /**
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

    return Image.find(imageQuery(tags, user, searchOptions))
      .populate('user', '-password') // get only the name of the user who posted the image
      .populate('tags') // populate tags
      .skip((page - 1) * imagePerPage) // start to get the images depending of the given page
      .limit(imagePerPage) // limit the number of image to get
      .sort({ _id: searchOptions.sort.order }); // order by date by DESC
  }

  /**
   * get an image by its ID
   * @api public
   * @param {String} id the id of the image to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static getById: GetById = id => {
    debug.mongoose('%o has been called', 'ImageController.getById');

    return Image.findById(id).populate('user', 'name').populate('tags');
  }

  /**
   * get the amount of images
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
   * @returns {Promise<Number>}
   */
  public static getCount: GetCount = async (tags, user, searchOptions) => {
    debug.mongoose('%o has been called', 'ImageController.getCount');

    let pageCount: number;

    try {
      const documentsCount = await Image.countDocuments(imageQuery(tags, user, searchOptions));

      pageCount = Math.ceil(documentsCount / imagePerPage);
    } catch (error) {
      throw new Error('The count of pages couldn\'t be found');
    }

    return pageCount;
  }

}
