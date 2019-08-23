import { TagModel } from '../../Models/Tag/tag.types.d';
import { Query, ArrayQuery } from '../controller.types';

export interface AddMultipleResolve {
  success: boolean;
  succeeded: number;
  failed: number;
  tags: TagModel[];
}

// methods type
export type Add = (tag: TagModel) => Query;
export type AddMultiple = (tags: TagModel[]) => Promise<AddMultipleResolve>;
export type GetAll = () => ArrayQuery;

export interface ITagController {
  add: Add;
  addMultiple: AddMultiple;
  getAll: GetAll;
}
