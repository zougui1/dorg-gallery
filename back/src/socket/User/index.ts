import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocument } from '../socket.types';
import { EmitLogged, EmitUserObject } from './user.types';

export class On {

  public static signup: SocketListener = function signup(socket) {
    socket.on('signup', async user => {
      debug.socket.on('signup');

      if (!user.name && user.username) {
        user.name = user.username;
        delete user.username;
      }

      try {
        const createdUser = await controllers.User.signup(user); // create the user
        const userDb = await controllers.User.getById(createdUser._id); // get the user WITHOUT its password

        debug.socket.on(debug.chalk.green('signup success'));
        Emit.signupSuccess(socket, userDb);
      } catch (error) {
        Emit.signupFailed(socket, 'An error occured');

        throw new Error(error);
      }
    });
  }

  public static login: SocketListener = function login(socket) {
    socket.on('login', async user => {
      debug.socket.on('login');

      try {
        const userDb = await controllers.User.login(user);

        debug.socket.on(debug.chalk.green('login success'));
        Emit.logged(socket, userDb);
      } catch (error) {
        let errorMessage: string = '';

        if (error.from === 'password' || error.from === 'user') {
          error = error.errorMessage;
        } else {
          error = 'An error occured and you couldn\'t be logged in';
        }

        Emit.loginFailed(socket, errorMessage);

        throw new Error(error);
      }
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
