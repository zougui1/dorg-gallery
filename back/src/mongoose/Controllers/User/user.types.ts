import { UserModel, ComparePassword } from '../../Models/User/user.types';
import { Document, Query as MQuery } from 'mongoose';
import { NullableQuery } from '../controller.types';

export interface LoginResolve {
  user: UserModel;
}

// methods type
export type Signup = (userModel: UserModel) => Promise<Document & UserModel>;
export type FindByName = (name: string) => NullableQuery;
export type Login = (user: UserModel) => Promise<LoginResolve>;
export type GetCount = () => MQuery<number>;

export interface IUserController {
  signup: Signup;
  findByName: FindByName;
  login: Login;
  getCount: GetCount;
}
