/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { renderDemo, configure as demoConfigure } from 'redux-service-demo';
import { auth, configure } from '../src';
import 'redux-service-demo/styles/index.css';
import apiConfig from './config.yml'

demoConfigure({
  title: 'Auth0 Redux Data Service',
  useLogger: true,
});

configure(apiConfig);

const services = {
  auth: {
    reducer: auth.reducer,
    types: auth.types,
    actions: auth.actions,
    forms: {
      authorize: [ 'opts' ],
    },
  },
};

const store = renderDemo(services, document.getElementById('container'));
store.dispatch(auth.actions.configure());
