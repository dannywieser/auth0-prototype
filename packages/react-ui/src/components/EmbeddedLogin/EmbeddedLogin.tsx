import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import autobind from 'autobind-decorator';
import { TextField } from '@bb-ui-toolkit/toolkit-react/lib/TextField';
import { DefaultButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';
import { auth } from 'bb-auth-data-service';
import * as styles from './EmbeddedLogin.styles';

export interface IEmbeddedLoginProps {
  isAuthenticated: boolean;
}

interface IDispatchProps {
  passwordgrant: Function;
  profile: Function;
}

export type IEmbeddedLoginAllProps = IEmbeddedLoginProps & IDispatchProps;

export class EmbeddedLoginBase extends React.Component<IEmbeddedLoginAllProps> {
  state = {
    username: '',
    password: '',
  };

  @autobind
  async login() {
    const { passwordgrant, profile } = this.props;
    const { username, password } = this.state;
    await passwordgrant(username, password);
    //For some reason profile loading is failing with the password grant type...
    //profile();
  }

  @autobind
  handleUserNameUpdate(value: string) {
    this.setState({ username: value });
  }

  @autobind
  handlePasswordUpdate(value: string) {
    this.setState({ password: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className={styles.embedded}>
        <h2>Embedded Login</h2>
        <span>
          <p>uses the auth0 password grant (/oauth/token) to POST username/password and retrieve an access token</p>
          <p>NB: doesn't seem to work with any connection type other than username-password (db)</p>
        </span>
        <TextField value={username} placeholder="user name" onChanged={this.handleUserNameUpdate}/>
        <TextField value={password} placeholder="password" onChanged={this.handlePasswordUpdate}/>
        <DefaultButton onClick={this.login}>Login</DefaultButton>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    passwordgrant: auth.actions.passwordgrant,
    profile: auth.actions.profile,
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const EmbeddedLoginContainer = connect<IEmbeddedLoginProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(EmbeddedLoginBase);

export const EmbeddedLogin = EmbeddedLoginContainer;
