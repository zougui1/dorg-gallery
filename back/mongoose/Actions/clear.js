const models = require('../Models');

// clear the whole DB
const clear = () => new Promise((resolve, reject) => {
  const modelsAmount = Object.keys(models).length;
  let i = 0;

  for (const modelName in models) {
    if (models.hasOwnProperty(modelName)) {
      // get the model
      const model = models[modelName][modelName];

      // delete everything in the model
      model.deleteMany()
        .then(() => {
          if (modelsAmount === ++i) {
            resolve();
          }
        })
        .catch(reject);
    }
  }
});

module.exports = clear;
