import { debug } from '../../config';
import { controllers } from '../../mongoose';
import { SocketListener, SocketErrorListener, SocketSendDocument } from '../socket.types';
import { EmitLogged, EmitUserObject } from './user.types';
import { createErrorEmitter } from '../../utils';

export class On {

  /**
   * is called when a client wants to sign up
   * @public
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
   * @public
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

  /**
   * is called when a user wants to change their account settings
   * @public
   * @param {SocketIO.Socket} socket
   */
  public static editUserData: SocketListener = function editUserData(socket) {
    socket.on('editUserData', async data => {
      debug.socket.on('editUserData');

      const password: string | undefined = data.password;

      try {
        data.user.blacklist = (await controllers.Tag.getMultipleByName(data.blacklist.split(' '))).documents.map(t => t._id);

        await controllers.User.editById(data.id, data.user);

        if (password) {
          await controllers.User.editPasswordById(data.id, password);
        }
      } catch (error) {
        Emit.editUserDataFail(socket, error.message);

        throw error;
      }

      const user: any = await controllers.User.getById(data.id);

      debug.socket.on(debug.chalk.green('editUserData success'));
      Emit.editUserDataSuccess(socket, user);
    });
  }
};

export class Emit {
  /**
   * is called if the sign up succeed
   * @public
   * @param {SocketIO.Socket} socket
   */
  public static signupSuccess: EmitUserObject = function signupSuccess(socket, user) {
    debug.socket.emit('signupSuccess');

    socket.emit('signupSuccess', { success: true, user: user });
  }

  /**
   * is called if the sign up failed
   * @public
   */
  public static signupFailed = createErrorEmitter('signupFailed');

  /**
   * is called if the log in succeed
   * @public
   * @param {SocketIO.Socket} socket
   */
  public static loginSuccess: EmitLogged = function loginSuccess(socket, user) {
    debug.socket.emit('loginSuccess');

    socket.emit('loginSuccess', { success: true, user: user });
  }

  /**
   * is called if the log in failed
   * @public
   */
  public static loginFailed = createErrorEmitter('loginFailed');

  /**
   * is called if the edition of the user data succeeded
   * @public
   * @param {SocketIO.Socket} socket
   */
  public static editUserDataSuccess: EmitLogged = function editUserDataSuccess(socket, user) {
    debug.socket.emit('editUserDataSuccess');

    socket.emit('editUserDataSuccess', { success: true, user: user });
  }

  /**
   * is called if the edition of the user data failed
   * @public
   */
  public static editUserDataFail = createErrorEmitter('editUserDataFail');
}
