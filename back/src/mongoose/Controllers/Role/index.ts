import { debug } from '../../../config';
import { Role } from '../../Models/Role';
import { IRoleController, Add, GetAll } from './role.types';
import { RoleModel } from '../../Models/Role/role.types';

export const RoleController: IRoleController = class RoleController {

  /**
   * create a role
   */
  public static add: Add = name => {
    debug.mongoose('%o has been called', 'RoleController.add');

    const role = new Role({
      // @ts-ignore
      name,
    });

    return role.save();
  }

  /**
   * get all the roles
   */
  public static getAll: GetAll = () => {
    debug.mongoose('%o has been called', 'RoleController.getAll');

    return Role.find();
  }
}
