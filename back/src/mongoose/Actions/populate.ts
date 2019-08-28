import { controllers } from '..';

export const populate = async () => {
  return await controllers.Role.add('user');
};
