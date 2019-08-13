import { debug } from '../../../config';
import { User } from '../../Models/User';
import { Signup, FindByName, Login, GetCount } from './user.types';
import { UserModel } from '../../Models/User/user.types';

export class UserController {

  /**
   * create a new user
   */
  public static signup: Signup = ({ name, password }) => {
    debug.mongoose('%o has been called', 'UserController.signup');

    const user = new User({
      // @ts-ignore
      name,
      password,
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
   * get a user if its name and password matches
   */
  public static login: Login = user => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'UserController.login');

    UserController.findByName(user.name)
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
              password: ''
            };

            resolve({ user: userObj });
          } else {
            reject({ from: 'password', errorMessage: 'The password is incorrect' });
          }
        });
      })
      .catch(reject);
  })

  /**
   * get the amount of users
   */
  public static getCount: GetCount = () => {
    debug.mongoose('%o has been called', 'UserController.getCount');

    return User.countDocuments();
  }

};

module.exports = UserController;
