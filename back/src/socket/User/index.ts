import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocument } from '../socket.types';
import { EmitLogged, EmitUserObject } from './user.types';

export class On {
  public static signup: SocketListener = function signup(socket) {
    socket.on('signup', user => {
      debug.socket.on('signup');

      controllers.User.signup(user)
        .then(user => {

          // used to avoid to send the user's password
          const userObject = {
            _id: user._id,
            name: user.name
          };

          debug.socket.on(debug.chalk.green('signup success'));

          Emit.userCreated(socket, userObject);
        })
        .catch(err => {
          console.error(err);

          Emit.signupFailed(socket, 'This username is already used');
        });
    });
  }

  public static login: SocketListener = function login(socket) {
    socket.on('login', user => {
      debug.socket.on('login');

      controllers.User.login(user)
        .then(user => {
          debug.socket.on(debug.chalk.green('login success'));

          Emit.logged(socket, user.user);
        })
        .catch(err => {
          console.error(err);
          let error;

          if (err.from === 'password' || err.from === 'user') {
            error = err.errorMessage;
          } else {
            error = 'An error occured and you couldn\'t be logged in';
          }

          Emit.loginFailed(socket, error);
        });
    });
  }
};

export class Emit {

  public static userCreated: EmitUserObject = function userCreated(socket, user) {
    debug.socket.emit('userCreated');

    socket.emit('userCreated', { success: true, user: user });
  }

  public static signupFailed: SocketErrorListener = function signupFailed(socket, error) {
    debug.socket.emit('signupFailed');

    socket.emit('signupFailed', { success: false, error: error });
  }

  public static logged: EmitLogged = function logged(socket, user) {
    debug.socket.emit('logged');

    socket.emit('userCreated', { success: true, user: user });
  }

  public static loginFailed: SocketErrorListener = function loginFailed(socket, error) {
    debug.socket.emit('loginFailed');

    socket.emit('loginFailed', { success: false, error: error });
  }
}
