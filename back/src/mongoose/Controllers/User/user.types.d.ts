import { UserModel, ComparePassword } from '../../Models/User/user.types.d';
import { Document, Query as MQuery } from 'mongoose';
import { NullableQuery } from '../controller.types';

export interface LoginResolve {
  user: UserModel;
}

// methods type
export type Signup = (userModel: UserModel) => Promise<Document & UserModel>;
export type FindByName = (name: string) => NullableQuery;
export type FindBySlug = (slug: string) => NullableQuery;
export type Login = (user: UserModel | any) => Promise<UserModel>;
export type GetById = (id: string) => NullableQuery;
export type EditById = (id: string, user: UserModel) => Promise<Document | null>;
export type EditPasswordById = (id: string, newPassword: string) => Promise<Document | null>;
export type GetCount = () => MQuery<number>;
export type Slugify = (username: string, id?: string) => Promise<string>;

export interface IUserController {
  signup: Signup;
  findByName: FindByName;
  findBySlug: FindBySlug;
  login: Login;
  getById: GetById;
  editById: EditById;
  editPasswordById: EditPasswordById;
  getCount: GetCount;
  slugify: Slugify;
}
