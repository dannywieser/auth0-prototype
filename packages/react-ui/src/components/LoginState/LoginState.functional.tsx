import * as React from 'react';
import { PrimaryButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';
import { Avatar } from '@bb-ui-toolkit/toolkit-react/lib/Avatar';
import * as styles from './LoginState.styles';

export interface IAuthenticatedComponent {
  isAuthenticated: boolean;
}

export interface ILogoutButtonProps {
  logout: any;
}
export const LogoutButton = ({ logout }: ILogoutButtonProps) =>
  (<PrimaryButton className={styles.authButton} onClick={logout}>log out</PrimaryButton>);

export interface ILoginButtonProps {
  authorize: any;
}
export const LoginButton = ({ authorize }: ILoginButtonProps) =>
  (<PrimaryButton className={styles.authButton} onClick={authorize}>log in</PrimaryButton>);

export type ILoginLogoutProps = ILoginButtonProps & ILogoutButtonProps & IAuthenticatedComponent;
export const LoginLogout = ({ authorize, logout, isAuthenticated }: ILoginLogoutProps) => (
  isAuthenticated ?
    <LogoutButton logout={logout}/> :
    <LoginButton authorize={authorize}/>
  );

export interface ILoggedInAsProps {
  isAuthenticated: boolean;
  profile: any; //TODO: need props
}
export function LoggedInAs({ isAuthenticated, profile }: ILoggedInAsProps) {
  const { name = '', picture = '' } = profile || {};
  return isAuthenticated ?
    (<span><Avatar image={picture} />logged in as: {name}</span>) :
    (<span>not logged in</span>);
}
