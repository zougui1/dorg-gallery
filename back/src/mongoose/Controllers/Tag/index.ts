import { debug } from '../../../config';
import { Tag } from '../../Models/Tag';
import { Add, AddMultiple, GetAll, ITagController, GetByName, GetMultipleByName } from '../Tag/tag.types';
import { TagModel } from '../../Models/Tag/tag.types';
import { multipleQueriesHandler } from '../../../utils/requestHelpers';
import { DocumentQuery } from 'mongoose';
import { MultipleQueries } from '../controller.types';

export const TagController: ITagController = class TagController {

  /**
   * add a tag only if it doesn't already exists
   * @api public
   * @param {String} name of the tag to add
   * @returns {DocumentQuery<Document, Document, {}>}
   */
  public static add: Add = name => {
    debug.mongoose('%o has been called', 'TagController.add');

    return Tag.findOneAndUpdate({ name }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  /**
   * add several tags if they doesn't already exists
   * @api public
   * @param {String[]} tags name of the tags to add
   * @returns {Promise<MultipleQueries<Document>>}
   */
  public static addMultiple: AddMultiple = (tags = [])  => {
    debug.mongoose('%o has been called', 'TagController.addMultiple');

    tags.push('*');

    return multipleQueriesHandler(TagController.add, tags);
  };

  /**
   * find a tag by name
   * @api public
   * @param {String} tag name of the tag to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static getByName: GetByName = tag => {
    debug.mongoose('%o has been called', 'TagController.getByName');

    return Tag.findOne({ name: tag });
  }

  /**
   * find several tags by their name
   * @api public
   * @param {String[]} tags name of the tags to find
   * @returns {Promise<MultipleQueries<Document>>}
   */
  public static getMultipleByName: GetMultipleByName = (tags = []) => {
    debug.mongoose('%o has been called', 'TagController.getMultipleByName');

    tags.push('*');

    return multipleQueriesHandler(TagController.getByName, tags);
  };

  /**
   * TODO remove all the uses of this method then delete it
   * get all the tags
   * @returns {DocumentQuery<Document[], Document, {}>}
   */
  public static getAll: GetAll = () => {
    return Tag.find();
  }

};
