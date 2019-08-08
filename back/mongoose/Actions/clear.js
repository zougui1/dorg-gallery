const models = require('../Models');

const clear = () => new Promise((resolve, reject) => {
  const modelsAmount = Object.keys(models).length;
  let i = 0;

  for (const modelName in models) {
    if (models.hasOwnProperty(modelName)) {
      const model = models[modelName][modelName];

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
