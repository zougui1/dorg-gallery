import { debug } from '../../../config';
import { Role } from '../../Models/Role';
import { IRoleController, Add, FindByName, GetAll } from './role.types';
import { RoleModel } from '../../Models/Role/role.types';
import { DocumentQuery } from 'mongoose';

export const RoleController: IRoleController = class RoleController {

  /**
   * create a role
   * @api public
   * @param {String} name of the role to create
   * @returns {Promise<Document>}
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
   * get a role by name
   * @api public
   * @param {String} name of the role to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static findByName: FindByName = name => {
    debug.mongoose('%o has been called', 'RoleController.findByName');

    return Role.findOne({ name: name.toLowerCase() });
  }

  /**
   * get all the roles
   * @api public
   * @returns {DocumentQuery<Documen[], Document, {}>}
   */
  public static getAll: GetAll = () => {
    debug.mongoose('%o has been called', 'RoleController.getAll');

    return Role.find();
  }
}
