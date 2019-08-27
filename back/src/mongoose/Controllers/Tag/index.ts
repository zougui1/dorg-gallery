import { debug } from '../../../config';
import { Tag } from '../../Models/Tag';
import { Add, AddMultiple, GetAll, ITagController, GetByName, GetMultipleByName } from '../Tag/tag.types';
import { TagModel } from '../../Models/Tag/tag.types';
import { multipleQueriesHandler } from '../../../utils/requestHelpers';

export const TagController: ITagController = class TagController {

  /**
   * add a tag only if it doesn't already exists
   */
  public static add: Add = name => {
    debug.mongoose('%o has been called', 'TagController.add');

    return Tag.findOneAndUpdate({ name }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  /**
   * add several tags if they doesn't already exists
   */
  public static addMultiple: AddMultiple = (tags = [])  => {
    debug.mongoose('%o has been called', 'TagController.addMultiple');

    tags.push('*');

    return multipleQueriesHandler(TagController.add, tags);
  };

  public static getByName: GetByName = tag => {
    debug.mongoose('%o has been called', 'TagController.getByName');

    return Tag.findOne({ name: tag });
  }

  public static getMultipleByName: GetMultipleByName = (tags = []) => {
    debug.mongoose('%o has been called', 'TagController.getMultipleByName');

    tags.push('*');

    return multipleQueriesHandler(TagController.getByName, tags);
  };

  public static getAll: GetAll = () => {
    return Tag.find();
  }

};
