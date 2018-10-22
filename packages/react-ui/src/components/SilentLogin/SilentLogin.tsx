import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import autobind from 'autobind-decorator';
import { TextField } from '@bb-ui-toolkit/toolkit-react/lib/TextField';
import { DefaultButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';
import { auth } from 'bb-auth-data-service';
import * as styles from './SilentLogin.styles'

export interface ISilentLoginProps {
  isAuthenticated: boolean;
  error: any;
}

interface IDispatchProps {
  silentauth: Function;
  profile: Function;
  parseauth: Function;
}

export type ISilentLoginAllProps = ISilentLoginProps & IDispatchProps;

export class SilentLoginBase extends React.Component<ISilentLoginAllProps> {
  state = {
    connection: '',
  };

  @autobind
  async login() {
    const { silentauth } = this.props;
    await silentauth('oktatest');
  }

  @autobind
  handleConnectionUpdate(value: string) {
    this.setState({ connection: value });
  }

  render() {
    const { connection } = this.state;
    const { error } = this.props;
    const { key = '' } = error || {};

    return (
      <div className={styles.silent}>
        <h2>Silent Login</h2>
        <span>
          <p>Silent Login will attempt to connect to a fixed connection with no prompts</p>
          <p>If the user is signed onto the IDP already, an access token is granted</p>
          <p>If the user is logged out, an error code is returned indicating login is required</p>
          <p>At this point, the app could choose to redirect to the correct login page for authentication</p>
        </span>
        <div>ERROR: {key}</div>
        <TextField value={connection} placeholder="connection name" onChanged={this.handleConnectionUpdate}/>
        <DefaultButton onClick={this.login}>Login</DefaultButton>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.api.error,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    silentauth: auth.actions.silentauth,
    profile: auth.actions.profile,
    parseauth: auth.actions.parseauth,
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const SilentLoginContainer = connect<ISilentLoginProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(SilentLoginBase);

export const SilentLogin = SilentLoginContainer;
