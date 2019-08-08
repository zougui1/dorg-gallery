const { User } = require('../Models/User');

const userController = {

  signup: ({ name, password }) => {
    debug.mongoose('%o has been called', 'userController.signup');

    const user = new User({
      name,
      password,
    });

    return user.save();
  },

  findByName: name => {
    debug.mongoose('%o has been called', 'userController.findByName');

    return User.findOne({ name });
  },

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

  getCount: () => {
    debug.mongoose('%o has been called', 'userController.getCount');

    return User.countDocuments();
  },

};

module.exports = userController;
