import { Document } from 'mongoose';
import { TagModel } from '../../Models/Tag/tag.types.d';
import { Query, ArrayQuery, NullableQuery, MultipleDocuments } from '../controller.types';

export interface AddMultipleResolve {
  success: boolean;
  succeeded: number;
  failed: number;
  tags: TagModel[];
}

// methods type
export type Add = (tag: TagModel) => Query;
export type AddMultiple = (tags: string[]) => Promise<MultipleDocuments>;
export type GetAll = () => ArrayQuery;
export type GetByName = (tag: string) => NullableQuery;
export type GetMultipleByName = (tags: string[]) => Promise<MultipleDocuments>;

export interface ITagController {
  add: Add;
  addMultiple: AddMultiple;
  getAll: GetAll;
  getByName: GetByName;
  getMultipleByName: GetMultipleByName;
}
