import { debug } from '../../../config';
import { Tag } from '../../Models/Tag';
import { Add, AddMultiple, GetAll } from '../Tag/tag.types';
import { TagModel } from '../../Models/Tag/tag.types';

export class TagController {

  /**
   * add a tag only if it doesn't already exists
   */
  public static add: Add = ({ name }) => {
    debug.mongoose('%o has been called', 'TagController.add');

    return Tag.findOneAndUpdate({ name }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  /**
   * add several tags if they doesn't already exists
   */
  public static addMultiple: AddMultiple = tags => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'TagController.addMultiple');

    // @ts-ignore
    tags.push('*');
    let requestsDone = 0;
    let requestsFailed = 0;
    let length = tags.length;
    let tagDocuments: TagModel[] = [];

    tags.forEach(tag => {
      TagController.add(tag)
        .then(tag => {
          // @ts-ignore
          tagDocuments[tagDocuments.length] = tag;
          if ((++requestsDone + requestsFailed) === length) {
            resolve({ success: true, succeeded: requestsDone, failed: requestsFailed, tags: tagDocuments });
          }
        })
        .catch(err => {
          if ((requestsDone + (++requestsFailed)) === length) {
            if (requestsDone === 0) {
              resolve({ success: false, succeeded: 0, failed: requestsFailed, tags: tagDocuments });
            } else {
              reject({ success: true, succeeded: requestsDone, failed: requestsFailed, error: err });
            }
          }
        });
    });
  })

  public static getAll: GetAll = () => {
    return Tag.find();
  }

};
