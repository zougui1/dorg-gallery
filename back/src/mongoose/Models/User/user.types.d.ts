import { CoreModel } from '../model.types';
import { RoleModel } from '../Role/role.types';
import { TagModel } from '../Tag/tag.types';

export interface UserModel extends CoreModel {
  name: string;
  slug: string;
  password: string;
  roles: RoleModel[];
  blacklist: TagModel[];
}

export type ComparePassword = (candidatePassword: string, callback: ComparePasswordCallback) => void;
export type ComparePasswordCallback = (err?: any, isMatch?: boolean) => void;
