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
export type Login = (user: UserModel) => Promise<LoginResolve>;
export type GetById = (id: string) => NullableQuery;
export type GetCount = () => MQuery<number>;
export type Slugify = (username: string) => Promise<string>;

export interface IUserController {
  signup: Signup;
  findByName: FindByName;
  findBySlug: FindBySlug;
  login: Login;
  getById: GetById;
  getCount: GetCount;
  slugify: Slugify;
}
