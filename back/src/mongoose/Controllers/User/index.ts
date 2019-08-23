import urlSlug from 'url-slug';
import { debug } from '../../../config';
import { User } from '../../Models/User';
import { controllers } from '../';
import { Signup, FindByName, Login, GetCount, IUserController, GetById, Slugify, FindBySlug } from './user.types';
import { UserModel } from '../../Models/User/user.types';

export const UserController: IUserController = class UserController {

  public static slugify: Slugify = name => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'UserController.slugify');

    let slug = urlSlug(name).toLowerCase();
    User.countDocuments({ slug })
      .then(count => {
        if (count > 0) {
          slug += '_' + count;
        }
        resolve(slug);
      })
      .catch(reject);
  });

  /**
   * create a new user
   */
  public static signup: Signup = ({ name, password }) => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'UserController.signup');

    controllers.Role.findByName('user')
      .then(role => {
        if (!role) {
          return reject('The role "user" couldn\'t be found');
        }

        UserController.slugify(name)
          .then(slug => {

            const user = new User({
              // @ts-ignore
              name,
              slug,
              password,
              roles: [role._id],
            });

            resolve(user.save());
          })
          .catch(reject);
      })
      .catch(reject);
  });

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
  public static login: Login = user => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'UserController.login');

    UserController.findByName(user.name).populate('roles')
      .then(_userDb => {
        // avoid the conflict of type due to the methods associated to user documents
        const userDb: any = _userDb;

        if (!userDb) {
          return reject({ from: 'user', errorMessage: 'There is no user with this name' });
        }

        userDb.comparePassword(user.password, (err: string, isMatch?: boolean) => {
          if (err) return reject(err);

          if (isMatch) {
            const userObj: UserModel = {
              _id: userDb._id,
              name: userDb.name,
              slug: userDb.slug,
              roles: userDb.roles,
              password: ''
            };

            resolve({ user: userObj });
          } else {
            reject({ from: 'password', errorMessage: 'The password is incorrect' });
          }
        });
      })
      .catch(reject);
  });

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
