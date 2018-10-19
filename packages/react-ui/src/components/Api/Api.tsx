import 'whatwg-fetch';
import autobind from 'autobind-decorator';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DefaultButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';

interface IApiProps {
  accessToken: string
}

interface IDispatchProps {
}

export type IApiAllProps = IApiProps & IDispatchProps;

export class ApiTestBase extends React.Component<IApiAllProps> {
  state = {
    apiResult: '',
  };

  @autobind
  async public() {
    const { accessToken } = this.props;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const response = await fetch('http://localhost:3001/api/public', options);
    const apiResult = response.ok ? JSON.parse(await response.text()).message: response.status;
    this.setState({ apiResult });
  }

  @autobind
  async messages() {
    const { accessToken } = this.props;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const response = await fetch('http://localhost:3001/api/messages', options);
    const apiResult = response.ok ? JSON.parse(await response.text()).message: response.status;
    this.setState({ apiResult });
  }

  @autobind
  async todos() {
    const { accessToken } = this.props;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const response = await fetch('http://localhost:3001/api/todos', options);
    const apiResult = response.ok ? JSON.parse(await response.text()).message: response.status;
    this.setState({ apiResult });
  }

  render() {
    const { apiResult } = this.state;
    return (
      <div>
        <DefaultButton onClick={this.public}>Query Public API</DefaultButton>
        <DefaultButton onClick={this.messages}>Query Messages API</DefaultButton>
        <DefaultButton onClick={this.todos}>Query Todos API</DefaultButton>
        <div>{apiResult}</div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  const { accessToken = '' } = state.auth.authData || {};
  return {
    accessToken
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {};
  return bindActionCreators(actionCreators, dispatch);
}

export const ApiTestContainer = connect<IApiProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(ApiTestBase);

export const ApiTest = ApiTestContainer;
