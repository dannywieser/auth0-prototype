import {
  INITIAL_ASYNC_STATE,
  actionAsync,
  actionSync,
  createReducer,
  reducerAsyncActions,
  typeFail,
  apiState,
  apiStateFail,
  IAction,
} from 'bb-js-data-service-util';
import * as service from './auth-service';
import { IAuthState, IAuthData, IAuthProfile } from './auth.types';
import { config } from '../config';

export const INITIAL_STATE = {
  ...INITIAL_ASYNC_STATE,
  isAuthenticated: false,
  authData: null as IAuthData,
  profile: null as IAuthProfile,
};

export enum types {
  authorize = 'authorize',
  configure = 'configure',
  loadauth = 'loadauth',
  parseauth = 'parseauth',
  silentauth = 'silentauth',
  singleconnection = 'singleconnection',
  logout = 'logout',
  passwordgrant = 'passwordgrant',
  profile = 'profile',
  renew = 'renew',
}

// action creators
const authorize = (opts: any) => {
  service.authorize(opts);
  return actionSync(types.authorize, null);
};
const configure = () => {
  service.configure();
  return actionSync(types.configure, { ...config });
};
const loadauth = () => {
  const authData = service.loadAuth();
  return actionSync(types.loadauth, authData);
};
const parseAuthOpt = {
  type: types.parseauth,
  handler: service.parseAuth,
};
const parseauth = () => actionAsync(parseAuthOpt);
const profileOpt = {
  type: types.profile,
  handler: service.loadProfile,
};
const profile = () => (dispatch: Function, getState: Function) => {
  const { authData } = getState().auth;
  const { accessToken = null } = authData || {};
  return dispatch(actionAsync(profileOpt, accessToken));
};

const silentauth = (connection: string) => {
  service.silentAuth(connection);
  return actionSync(types.silentauth, null);
};
const singleconnection = (connection: string) => {
  service.singleConnection(connection);
  return actionSync(types.silentauth, null);
};
const logout = () => {
  service.logout();
  return actionSync(types.logout, null);
};
const renewOpt = {
  type: types.renew,
  handler: service.renew,
};
const renew = () => actionAsync(renewOpt);

const passwordgrantOpt = {
  type: types.passwordgrant,
  handler: service.passwordGrant,
}
const passwordgrant = (username: string, password: string) => actionAsync(passwordgrantOpt, username, password);

export const actions: {[actionName: string]: Function} = {
  authorize,
  configure,
  loadauth,
  passwordgrant,
  parseauth,
  profile,
  silentauth,
  singleconnection,
  logout,
  renew,
};

// standard async actions, handled via bb-js-data-service-util helpers
const asyncActions = [types.parseauth, types.profile, types.renew, types.passwordgrant];

// special case reducers
export const noChange = (state: IAuthState) => state;
// reducer to handle authentication failures: clear out state from possible previous successful attempts
export const authFailure = (state: IAuthState, data: IAction) => ({
  ...state,
  authData: null as IAuthData,
  profile: null as IAuthProfile,
  isAuthenticated: false,
  ...apiState(state, apiStateFail(data.payload)),
});
export const handleConfigure = (state: IAuthState, data: IAction) => ({
  ...state,
  config: { ...data.payload },
});
export const handleLoadAuth = (state: IAuthState, data: IAction) => {
  const { isAuthenticated = false, authData } = data.payload as IAuthState;
  return { ...state, isAuthenticated, authData };
};
// reducer map setup
export const reducerMap = {
  ...reducerAsyncActions(asyncActions),
  [types.authorize]: noChange,
  [types.configure]: handleConfigure,
  [types.silentauth]: noChange,
  [types.logout]: noChange,
  [types.singleconnection]: noChange,
  [types.loadauth]: handleLoadAuth,
  [typeFail(types.parseauth)]: authFailure,
  [typeFail(types.renew)]: authFailure,
};
export const reducer = createReducer(INITIAL_STATE, reducerMap);
