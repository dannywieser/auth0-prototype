import { IBaseState } from 'bb-js-data-service-util';

export interface IAuthConfig {
  auth0: auth0.AuthOptions;
  logoutUri: string;
}

export interface IAuthProfile {
  name?: string;
  nickname?: string;
  picture?: string;
  updated_at?: Date;
  sub?: string;
}

export interface IAuthData {
  accessToken?: string;
  idToken?: string;
  appState?: string;
  refreshToken?: string;
  state?: string;
  tokenType?: string;
  scope?: string;
  expiresIn?: number;
  expiresAt?: number;
}

export interface IAuthState extends IBaseState {
  isAuthenticated: boolean;
  profile?: IAuthProfile;
  authData?: IAuthData;
  config: IAuthConfig;
}
