const { Tag } = require('../Models/Tag');

const tagController = {

  /**
   * add a tag only if it doesn't already exists
   */
  add: ({ name }) => {
    debug.mongoose('%o has been called', 'tagController.add');

    return Tag.findOneAndUpdate({ name }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
  },

  /**
   * add several tags if they doesn't already exists
   */
  addMultiple: tags => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'tagController.addMultiple');

    tags.push('*');
    let requestsDone = 0;
    let requestsFailed = 0;
    let length = tags.length;
    let tagDocuments = [];

    tags.forEach(tag => {
      tagController.add(tag)
        .then(tag => {
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
  }),

  getAll: () => {
    return Tag.find();
  },

};

module.exports = tagController;
