import { CoreModel } from '../model.types';

export interface UserModel extends CoreModel {
  name: string;
  password: string;
}

export type ComparePassword = (candidatePassword: string, callback: ComparePasswordCallback) => void;
export type ComparePasswordCallback = (err?: any, isMatch?: boolean) => void;
