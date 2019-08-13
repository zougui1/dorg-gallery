import { CoreModel } from '../model.types';

export interface TagModel extends CoreModel {
  _id: string;
  name: string;
}
