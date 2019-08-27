import urlSlug from 'url-slug';
import { debug } from '../../../config';
import { User } from '../../Models/User';
import { controllers } from '../';
import { Signup, FindByName, Login, GetCount, IUserController, GetById, Slugify, FindBySlug } from './user.types';
import { UserModel } from '../../Models/User/user.types';


export const UserController: IUserController = class UserController {

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
   */
  public static findByName: FindByName = name => {
    debug.mongoose('%o has been called', 'UserController.findByName');

    return User.findOne({ name });
  }

  /**
   * get a user by its slug
   */
  public static findBySlug: FindBySlug = slug => {
    debug.mongoose('%o has been called', 'UserController.findBySlug');

    return User.findOne({ slug });
  }

  /**
   * get a user if its name and password matches
   */
  public static login: Login = async user => {
    debug.mongoose('%o has been called', 'UserController.login');

    const _userDb = await UserController.findByName(user.name).populate('roles');

    // avoid the conflict of type due to the methods associated to user documents
    const userDb: any = _userDb;

    if (!userDb) {
      throw new Error(JSON.stringify({ from: 'user', errorMessage: 'There is no user with this name' }));
    }

    const match = await userDb.comparePassword(user.password);

    if (!match) {
      throw new Error(JSON.stringify({ from: 'password', errorMessage: 'The password is incorrect' }));
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

  public static getById: GetById = id => {
    debug.mongoose('%o has been called', 'UserController.getById');

    return User.findById(id).select('-password').populate('roles');
  }

  /**
   * get the amount of users
   */
  public static getCount: GetCount = () => {
    debug.mongoose('%o has been called', 'UserController.getCount');

    return User.countDocuments();
  }

};
