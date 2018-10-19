import * as auth0 from 'auth0-js';
import { config } from '../config';

// constants
export const ACCESS_TOKEN = 'access_token';
export const ID_TOKEN = 'id_token';
export const EXPIRY = 'expiry';

// utility and helper functions
export const isOk = (result: any, err: auth0.Auth0Error) => (result != null && err == null);
export const authError = (err: auth0.Auth0Error) => {
  const { error = '', errorDescription = '' } = err || {};
  return { key: error, description: errorDescription };
};
export const apiError = (error: auth0.Auth0Error) => ({ status: error.statusCode, description: error.description });
export const calcExpiry = (expiresIn: number) => expiresIn === null ? null : JSON.stringify((expiresIn * 1000) + new Date().getTime());
export const isExpired = (expiresAt: number) => new Date().getTime() < expiresAt;
export const extractProfile = (idTokenPayload: any) => {
  const { nickname = '', name = '', picture = '', updated_at = null as number, sub = '' } = idTokenPayload || {};
  return {
    sub,
    nickname,
    name,
    picture,
    updated_at,
  };
};
export const authResultPayload = (authResult: auth0.Auth0DecodedHash) => {
  const isAuthenticated = authResult !== null;
  const { idTokenPayload = {}, expiresIn = null, ...data } = authResult || {};
  const expiresAt = calcExpiry(expiresIn);
  const profile = extractProfile(idTokenPayload);
  const authData = { ...data, expiresIn, expiresAt };
  return { authData, profile, isAuthenticated };
};

// local storage for auth data
const persist = (key: string, value: any) => localStorage.setItem(key, value);
const remove = (key: string) => localStorage.removeItem(key);
const retrieve = (key: string) => localStorage.getItem(key);
const retrieveAsNumber = (key: string) => Number(retrieve(key));

const persistAuthData = (authResult: auth0.Auth0DecodedHash) => {
  const { accessToken = null, idToken = null, expiresIn = null } = authResult || {};
  const expiresAt = calcExpiry(expiresIn);
  persist(ACCESS_TOKEN, accessToken);
  persist(ID_TOKEN, idToken);
  persist(EXPIRY, expiresAt);
};
const clearAuthData = () => {
  remove(ACCESS_TOKEN);
  remove(ID_TOKEN);
  remove(EXPIRY);
};
const retrieveAuth = () => {
  const accessToken = retrieve(ACCESS_TOKEN);
  const idToken = retrieve(ID_TOKEN);
  const expiresAt = retrieveAsNumber(EXPIRY);
  const isAuthenticated = isExpired(expiresAt);
  const authData = isAuthenticated ? { accessToken, idToken } : null;
  return { isAuthenticated, authData };
};

// service functions
let auth: auth0.WebAuth;
export const configure = () => {
  auth = new auth0.WebAuth({ ...config.auth0 });
};
export const loadAuth = () => {
  const { isAuthenticated, authData } = retrieveAuth();
  if (!isAuthenticated) {
    clearAuthData();
  }
  return { isAuthenticated, authData };
};
export const parseAuth = () => {
  return new Promise((resolve) => {
    auth.parseHash((err, authResult) => {
      const ok = isOk(authResult, err);
      const payload = ok ?  authResultPayload(authResult) : authError(err);
      persistAuthData(authResult);
      resolve({ ok, payload });
    });
  });
};
export const loadProfile = (accessToken: string) => {
  return new Promise((resolve) => {
    try {
      auth.client.userInfo(accessToken, (error, profile) => {
        const ok = isOk(profile, error);
        const payload = ok ? { profile } : apiError(error);
        resolve({ ok, payload });
      });
    } catch (error) {
      resolve({ ok: false, payload: { key: 'invalid_token' } });
    }
  });
};
export const logout = () => {
  clearAuthData();
  auth.logout({ returnTo: config.logoutUri });
};

export const authorize = (opts: any) => auth.authorize(opts);
export const renew = () => {
  return new Promise((resolve) => {
    auth.checkSession({}, (err, authResult) => {
      const ok = isOk(authResult, err);
      const payload = ok ? authResultPayload(authResult) : authError(err);
      persistAuthData(authResult);
      resolve({ ok, payload });
    });
  });
};
