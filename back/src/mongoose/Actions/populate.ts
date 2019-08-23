import { controllers } from '..';

export const populate = () => new Promise((resolve, reject) => {
  controllers.Role.add('user')
    .then(resolve)
    .catch(reject);
});
