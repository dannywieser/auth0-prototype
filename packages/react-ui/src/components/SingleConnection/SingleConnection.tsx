import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import autobind from 'autobind-decorator';
import { TextField } from '@bb-ui-toolkit/toolkit-react/lib/TextField';
import { DefaultButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';
import { auth } from 'bb-auth-data-service';
import * as styles from './SingleConnection.styles'

export interface ISingleConnectionProps {
  isAuthenticated: boolean;
}

interface IDispatchProps {
  singleconnection: Function;
}

export type ISingleConnectionAllProps = ISingleConnectionProps & IDispatchProps;

export class SingleConnectionBase extends React.Component<ISingleConnectionAllProps> {
  state = {
    connection: '',
  };

  @autobind
  async login() {
    const { connection } = this.state;
    const { singleconnection } = this.props;
    await singleconnection(connection);
  }

  @autobind
  handleConnectionUpdate(value: string) {
    this.setState({ connection: value });
  }

  render() {
    const { connection } = this.state;
    return (
      <div className={styles.single}>
        <h2>Single Connection</h2>
        <span>
          <p>Some other logic or service has been used to determine which connection to authenticate with</p>
          <p>Nearly the same as a "silent" auth, with the exception that if a login is required, it will forward directly to the identity provider instead of returning an error code</p>
          <p>NB: known issue: error returned indicating 'state' does not match.  Need to investigate.</p>
        </span>
        <TextField value={connection} placeholder="connection name" onChanged={this.handleConnectionUpdate}/>
        <DefaultButton onClick={this.login}>Login</DefaultButton>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    singleconnection: auth.actions.singleconnection,
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const SingleConnectionContainer = connect<ISingleConnectionProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(SingleConnectionBase);

export const SingleConnection = SingleConnectionContainer;
