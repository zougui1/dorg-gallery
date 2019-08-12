const { controllers } = require('../mongoose');

const on = {
  signup: function signup(socket) {
    socket.on('signup', user => {
      debug.socket.on('signup');

      controllers.user.signup(user)
        .then(user => {

          // used to avoid to send the user's password
          const userObject = {
            _id: user._id,
            name: user.name
          };

          debug.socket.on(debug.chalk.green('signup success'));
          emit.private.userCreated(socket, userObject);
        })
        .catch(err => {
          console.error(err);
          emit.private.signupFailed(socket, 'This username is already used');
        });
    });
  },

  login: function login(socket) {
    socket.on('login', user => {
      debug.socket.on('login');

      controllers.user.login(user)
        .then(user => {
          debug.socket.on(debug.chalk.green('login success'));

          emit.private.logged(socket, user);
        })
        .catch(err => {
          console.error(err);
          let error;

          if (err.from === 'password' || err.from === 'user') {
            error = err.errorMessage;
          } else {
            error = 'An error occured and you couldn\'t be logged in';
          }

          emit.private.loginFailed(socket, error);
        });
    });
  },
};

const emit = {
  // used to send a response to the client
  private: {
    userCreated: function userCreated(socket, user) {
      debug.socket.emit('userCreated');

      socket.emit('userCreated', { success: true, user: user });
    },

    signupFailed: function signupFailed(socket, error) {
      debug.socket.emit('signupFailed');

      socket.emit('signupFailed', { success: false, error: error });
    },

    logged: function logged(socket, user) {
      debug.socket.emit('logged');

      socket.emit('userCreated', { success: true, user: user });
    },

    loginFailed: function loginFailed(socket, error) {
      debug.socket.emit('loginFailed');

      socket.emit('loginFailed', { success: false, error: error });
    },
  },
};

module.exports = {
  on: on,
  emit: emit.public,
};
