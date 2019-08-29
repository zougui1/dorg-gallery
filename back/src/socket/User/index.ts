import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocument } from '../socket.types';
import { EmitLogged, EmitUserObject } from './user.types';

export class On {

  /**
   * is called when a client wants to sign up
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static signup: SocketListener = function signup(socket) {
    socket.on('signup', async user => {
      debug.socket.on('signup');

      // get the username correctly
      if (!user.name && user.username) {
        user.name = user.username;
        delete user.username;
      }

      try {
        // create the user
        const createdUser = await controllers.User.signup(user);
        // get the user WITHOUT its password
        const userDb = await controllers.User.getById(createdUser._id);

        debug.socket.on(debug.chalk.green('signup success'));
        Emit.signupSuccess(socket, userDb);
      } catch (error) {
        Emit.signupFailed(socket, 'An error occured');

        throw new Error(error);
      }
    });
  }

  /**
   * is called when a user wants to log in
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static login: SocketListener = function login(socket) {
    socket.on('login', async user => {
      debug.socket.on('login');

      try {
        // get a user if the couple username and password match
        // match another couple username and password in the DB
        const userDb = await controllers.User.login(user);

        debug.socket.on(debug.chalk.green('login success'));
        Emit.loginSuccess(socket, userDb);
      } catch (error) {
        // TODO use it as default message 'An error occured and you couldn\'t be logged in'


        Emit.loginFailed(socket, error.message);

        throw new Error(error);
      }
    });
  }
};

export class Emit {
  /**
   * is called if the sign up succeed
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static signupSuccess: EmitUserObject = function signupSuccess(socket, user) {
    debug.socket.emit('signupSuccess');

    socket.emit('signupSuccess', { success: true, user: user });
  }

  /**
   * is called if the sign up failed
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static signupFailed: SocketErrorListener = function signupFailed(socket, error) {
    debug.socket.emit('signupFailed');

    socket.emit('signupFailed', { success: false, error: error });
  }

  /**
   * is called if the log in succeed
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static loginSuccess: EmitLogged = function loginSuccess(socket, user) {
    debug.socket.emit('loginSuccess');

    socket.emit('loginSuccess', { success: true, user: user });
  }

  /**
   * is called if the log in failed
   * @api public
   * @param {SocketIO.Socket} socket
   */
  public static loginFailed: SocketErrorListener = function loginFailed(socket, error) {
    debug.socket.emit('loginFailed');

    socket.emit('loginFailed', { success: false, error: error });
  }
}
