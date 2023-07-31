import { destroyCookie, parseCookies, setCookie } from 'nookies';

const COOKIE_AGE = 30 * 24 * 60 * 60; // 30 days;

export default class JWTToken {
  static store(token) {
    setCookie(null, 'token', token, {
      maxAge: COOKIE_AGE,
      path: '/',
    });
  }

  static getToken() {
    const cookies = parseCookies();
    const token = cookies['token'] ? 'Bearer ' + cookies['token'] : '';
    return token;
  }

  static removeToken() {
    destroyCookie(null, 'token', { path: '/' });
  }
}
