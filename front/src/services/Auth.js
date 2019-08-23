import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import store from '../store';
import authState from '../store/states/auth';
import roles from '../data/roles';

const actions = mapDynamicDispatch(authState.actions, 'login')(store.dispatch);

class Auth {

  // the name of the cookieSession to save
  static cookieName = 'cookieSession-Dorg-Gallery';
  // the secret key to encrypt/decrypt data
  static secretKey = 'draconity.org gallery; secret key';

  /**
   * get the user data from the state
   */
  static getUser = () => {
    return mapDynamicState('auth: user')(store.getState()).user;
  }

  /**
   * get the roles of the client
   */
  static getUserRoles = user => {
    if (Array.isArray(user.roles)) {
      return user.roles.map(role => role.value);
    }

    return [];
  }

  /**
   * get if the client is logged
   */
  static isLogged = () => {
    const user = Auth.getUser();
    return user.logged;
  }

  /**
   * get if the client is a user
   */
  static isUser = () => {
    const user = Auth.getUser();
    return Auth.getUserRoles(user).includes(roles.user);
  }

  /**
   * get if the client has given role
   */
  static hasRole = role => {
    const user = Auth.getUser();
    return Auth.getUserRoles(user).includes(role);
  }

  /**
   * encrypt data
   */
  static encrypt = data => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), Auth.secretKey);
  }

  /**
   * decrypt data
   */
  static decrypt = data => {
    if (!data) {
      return;
    }

    const bytes = CryptoJS.AES.decrypt(data.toString(), Auth.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  /**
   * add the 'role value' to each role the user have
   */
  static addRolesValue = user => {
    user.roles.forEach(role => {
      role.value = roles[role.name];
    });
  }

  /** used to signup the client
   * save the user data into the store and encrypt it into a cookie for 1 day
   */
  static signup = user => {
    if (typeof user === 'object') {
      Auth.saveUser(user);
    }
  }

  /** used to login the client
   * save the user data into the store and encrypt it into a cookie for 1 day
   */
  static login = user => {
    if (!user) {
      user = Auth.decrypt(Cookies.get(Auth.cookieName));
    }

    if (!user) {
      return;
    }

    Auth.saveUser(user);
  }

  /** used to logout the client
   * remove the cookie and the user data from the store
   */
  static logout = () => {
    Cookies.remove(Auth.cookieName);
    actions.login({});
  }

  /** used the save the client
   * save the user data into the store and encrypt it into a cookie
   */
  static saveUser = user => {
    user.logged = true;

    Auth.addRolesValue(user);

    actions.login(user);
    Auth.setCookieSession(user);
  }

  /** set a cookie to save the client
   * encrypt the user data and save it into a cookie
   */
  static setCookieSession = user => {
    const encryptedData = Auth.encrypt(user);
    Cookies.set(Auth.cookieName, encryptedData, { expires: 1 });
  }

}

export default Auth;
