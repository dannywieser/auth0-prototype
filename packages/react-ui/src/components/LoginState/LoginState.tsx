import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { auth } from 'bb-auth-data-service';
import * as styles from './LoginState.styles';
import { LoggedInAs, LoginLogout } from './LoginState.functional';

export interface ILoginStateProps {
  isAuthenticated: boolean;
  profile: any;
}

export interface IDispatchProps {
  authorize: any;
  loadAuth: any;
  loadProfile: any;
  logout: any;
}

export type ILoginStateAllProps = ILoginStateProps & IDispatchProps;

export class LoginStateBase extends React.Component<ILoginStateAllProps> {
  componentWillMount() {
    const { loadAuth, loadProfile, isAuthenticated, profile } = this.props;
    if (!isAuthenticated) {
      loadAuth();
    }
    if (profile == null) {
    //  loadProfile();
    }
  }

  render() {
    const { isAuthenticated, authorize, logout, profile } = this.props;
    return (
      <div className={styles.loginState}>
        <LoggedInAs isAuthenticated={isAuthenticated} profile={profile}/>
        <LoginLogout isAuthenticated={isAuthenticated} authorize={authorize} logout={logout}/>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    authorize:auth.actions.authorize,
    loadAuth: auth.actions.loadauth,
    loadProfile: auth.actions.profile,
    logout: auth.actions.logout,
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const LoginStateContainer = connect<ILoginStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(LoginStateBase);

export const LoginState = LoginStateContainer;
