import { ImageModel } from '../../Models/Image/image.types';
import { TagModel } from '../../Models/Tag/tag.types';
import { Document, Query as MQuery } from 'mongoose';
import { UserModel } from '../../Models/User/user.types';
import { NullableQuery, ArrayQuery } from '../controller.types';

// methods type
export type Add = (imageModel: ImageModel) => Promise<Document & ImageModel>;
export type GetByPage = (tags: TagModel[] | string[], page: number, property: string) => ArrayQuery;
export type GetByUser = (user: UserModel, page: number) => ArrayQuery;
export type GetById = (id: string) => NullableQuery;
export type GetCount = (user: UserModel, tags: TagModel[] | string[]) => MQuery<number>;

export interface IImageController {
  add: Add;
  getByPage: GetByPage;
  getByUser: GetByUser;
  getById: GetById;
  getCount: GetCount;
}
