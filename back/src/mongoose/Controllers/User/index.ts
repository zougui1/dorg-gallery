import urlSlug from 'url-slug';
import { debug } from '../../../config';
import { User } from '../../Models/User';
import { controllers } from '../';
import { Signup, FindByName, Login, GetCount, IUserController, GetById, Slugify, FindBySlug } from './user.types';
import { UserModel } from '../../Models/User/user.types';
import { DocumentQuery } from 'mongoose';


export const UserController: IUserController = class UserController {

  /**
   * make a unique slug out of a name
   * @api public
   * @param {String} name of the user to make a slug from
   * @returns {Promise<String>}
   */
  public static slugify: Slugify = async name => {
    debug.mongoose('%o has been called', 'UserController.slugify');

    let slug = urlSlug(name).toLowerCase();
    const count = await User.countDocuments({ slug });

    if (count > 0) {
      slug += '_' + count;
    }
    return slug;
  }

  /**
   * create a new user
   * @api public
   * @param {Object} destructured object
   * @param {String} destructured.name name of the user
   * @param {String} destructured.password password of the user
   * @returns {Promise<Document>}
   */
  public static signup: Signup = async ({ name, password }) => {
    debug.mongoose('%o has been called', 'UserController.signup');

    const role = await controllers.Role.findByName('user');

    if (!role) {
      throw new Error('The role "user" couldn\'t be found');
    }

    const slug = await UserController.slugify(name);

    const user = new User({
      // @ts-ignore
      name,
      slug,
      password,
      roles: [role._id],
    });

    return user.save();
  }

  /**
   * get a user by its name
   * @api public
   * @param {String} name of the user to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static findByName: FindByName = name => {
    debug.mongoose('%o has been called', 'UserController.findByName');

    return User.findOne({ name });
  }

  /**
   * get a user by its slug
   * @api public
   * @param {string} slug of the user to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static findBySlug: FindBySlug = slug => {
    debug.mongoose('%o has been called', 'UserController.findBySlug');

    return User.findOne({ slug });
  }

  // @ts-check
  /**
   * get a user if its name and password matches
   * @api public
   * @param {Object} user
   * @param {String} user.name
   * @param {String} user.password
   * @returns {Promise<UserModel>}
   */
  public static login: Login = async user => {
    debug.mongoose('%o has been called', 'UserController.login');
    console.log(user);

    if (!user.name && user.username) {
      user.name = user.username;
    }

    const _userDb = await UserController.findByName(user.name).populate('roles');

    // avoid the conflict of type due to the methods associated to user documents
    const userDb: any = _userDb;

    if (!userDb) {
      throw new Error('There is no user with this name');
    }

    const match = await userDb.comparePassword(user.password);

    if (!match) {
      throw new Error('The password is incorrect');
    }

    const userObj: UserModel = {
      _id: userDb._id,
      name: userDb.name,
      slug: userDb.slug,
      roles: userDb.roles,
      password: ''
    };

    return userObj;
  }

  /**
   * get a user by id
   * @api public
   * @param {String} id of the user to find
   * @returns {DocumentQuery<Document | null, Document, {}>}
   */
  public static getById: GetById = id => {
    debug.mongoose('%o has been called', 'UserController.getById');

    return User.findById(id).select('-password').populate('roles');
  }

  /**
   * get the amount of users
   * @api public
   * @returns {Query<Number>}
   */
  public static getCount: GetCount = () => {
    debug.mongoose('%o has been called', 'UserController.getCount');

    return User.countDocuments();
  }

};
