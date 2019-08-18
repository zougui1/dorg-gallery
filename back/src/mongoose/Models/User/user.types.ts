import { CoreModel } from '../model.types';
import { RoleModel } from '../Role/role.types';

export interface UserModel extends CoreModel {
  name: string;
  password: string;
  roles: RoleModel[];
}

export type ComparePassword = (candidatePassword: string, callback: ComparePasswordCallback) => void;
export type ComparePasswordCallback = (err?: any, isMatch?: boolean) => void;
