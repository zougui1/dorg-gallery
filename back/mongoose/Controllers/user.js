const { User } = require('../Models/User');

const userController = {

  /**
   * create a new user
   */
  signup: ({ name, password }) => {
    debug.mongoose('%o has been called', 'userController.signup');

    const user = new User({
      name,
      password,
    });

    return user.save();
  },

  /**
   * get a user by its name
   */
  findByName: name => {
    debug.mongoose('%o has been called', 'userController.findByName');

    return User.findOne({ name });
  },

  /**
   * get a user if its name and password matches
   */
  login: user => new Promise((resolve, reject) => {
    debug.mongoose('%o has been called', 'userController.login');

    userController.findByName(user.name)
      .then(userDb => {
        if (!userDb) {
          return reject({ from: 'user', errorMessage: 'There is no user with this name' });
        }

        userDb.comparePassword(user.password, (err, isMatch) => {
          if (err) return reject(err);

          if (isMatch) {
            const userObj = {
              _id: userDb._id,
              name: userDb.name
            };

            resolve({ user: userObj });
          } else {
            reject({ from: 'password', errorMessage: 'The password is incorrect' });
          }
        });
      })
      .catch(reject);
  }),

  /**
   * get the amount of users
   */
  getCount: () => {
    debug.mongoose('%o has been called', 'userController.getCount');

    return User.countDocuments();
  },

};

module.exports = userController;
