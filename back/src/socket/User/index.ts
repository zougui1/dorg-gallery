import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocument } from '../socket.types';
import { EmitLogged, EmitUserObject } from './user.types';

export class On {

  public static signup: SocketListener = function signup(socket) {
    socket.on('signup', user => {
      debug.socket.on('signup');

      if (!user.name && user.username) {
        user.name = user.username;
        delete user.username;
      }

      controllers.User.signup(user)
        .then(user => {
          debug.socket.on(debug.chalk.green('signup success'));

          controllers.User.getById(user._id)
            .then(user => {
              Emit.signupSuccess(socket, user);
            })
            .catch(err => {
              console.error(err);

              Emit.signupFailed(socket, 'An error occured');
            });

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
  public static signupSuccess: EmitUserObject = function signupSuccess(socket, user) {
    debug.socket.emit('signupSuccess');

    socket.emit('signupSuccess', { success: true, user: user });
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
