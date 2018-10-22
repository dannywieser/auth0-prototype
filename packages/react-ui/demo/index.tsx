import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { auth, configure } from 'bb-auth-data-service';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { demoStore } from './demo-utils';
import { LoginState, AuthCallback, ApiTest, EmbeddedLogin } from '../src';

const config = {
  auth0: {
    domain: 'dannywieser.auth0.com',
    clientID: 'AVhYSKdxHLDlf7I6Kp9dtHQau2n2Jh9u',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile read:messages read:todos',
    audience: 'http://localhost:3001/api',
  },
  logoutUri: 'http://localhost:8080',
}
configure(config);
const store = demoStore({ auth: auth.reducer });
store.dispatch(auth.actions.configure());

// no modification needed below this line
const DemoWrapper = (props: any) => {
  return (
    <Router>
      <Provider store={props.store}>
        <div>
          <Route exact path="/" component={LoginState} />
          <Route path="/callback" component={AuthCallback} />
          <Route exact path="/" component={EmbeddedLogin} />
          <Route exact path="/" component={ApiTest} />
        </div>
      </Provider>
    </Router>
  );
};

const container = document.getElementById('container');
ReactDOM.render(<DemoWrapper store={store} />, container);
