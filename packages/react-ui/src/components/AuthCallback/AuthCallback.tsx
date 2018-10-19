import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  Spinner,
  SpinnerSize
} from '@bb-ui-toolkit/toolkit-react/lib/Spinner';
import * as styles from './AuthCallback.styles';
import { auth } from 'bb-auth-data-service';

interface IAuthCallbackProps {
  isAuthenticated: boolean;
}

interface IDispatchProps {
  parseAuth: Function;
}

export type IAuthCallbackAllProps = IAuthCallbackProps & IDispatchProps;

const RedirectToHome = () => (<Redirect  to={ { pathname: '/' } }/>);
const AuthLoading = () => (<Spinner className={styles.centered} size={ SpinnerSize.xLarge } />);

export class AuthCallbackBase extends React.Component<IAuthCallbackAllProps> {
  componentDidMount() {
    const { parseAuth } = this.props;
    setTimeout(() => {
      //fake wait to show callback step
      parseAuth();
    }, 6000);
  }

  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <RedirectToHome/> : <AuthLoading />;
  }
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    parseAuth: auth.actions.parseauth
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const AuthCallbackContainer = connect<IAuthCallbackProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(AuthCallbackBase);
export const AuthCallback = AuthCallbackContainer;
