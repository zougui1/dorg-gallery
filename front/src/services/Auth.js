import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { mapDynamicDispatch } from 'dynamic-redux';

import store from '../store';
import authState from '../store/states/auth';

const actions = mapDynamicDispatch(authState.actions, 'login')(store.dispatch);

class Auth {

  // the name of the cookieSession to save
  static cookieName = 'cookieSession-Dorg-Gallery';
  // the secret key to encrypt/decrypt data
  static secretKey = 'draconity.org gallery; secret key';

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
