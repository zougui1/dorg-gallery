import { models } from '../';

// clear the whole DB
export const clear = async () => {
  let queries = [];

  for (const modelName in models) {
    if (models.hasOwnProperty(modelName)) {
      // @ts-ignore
      // get the model
      const model = models[modelName][modelName];

      // delete everything in the model
      queries.push(model.deleteMany());
    }
  }

  return await queries;
};
