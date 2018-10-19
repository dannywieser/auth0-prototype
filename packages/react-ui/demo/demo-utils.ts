import {
  combineReducers,
  createStore,
  applyMiddleware,
  ReducersMapObject,
} from 'redux';
import * as yaml from 'js-yaml';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const getDemoLocale = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('setLang') || 'en';
}

export const demoStore = (reducers: ReducersMapObject) => {
  const combinedReducers = combineReducers(reducers);
  const middlewares = [thunk, logger];
  return createStore(combinedReducers, applyMiddleware(...middlewares));
}

export const fetchYaml = async (path: string) => {
  const result = await fetch(path);
  return result.ok ? yaml.safeLoad(await result.text()) : null;
}

// for DEMO mode only, translations are loaded by a dynamic fetch/parse of the YAML files
// the packaging application of each component is responsible for creation of combined translation
// files for all included components, via parsing the included YAML files
export const loadTranslations = (componentName: string) => async (path: string) => {
  const parts = path.split('/');
  const locale = parts[0];
  return await fetchYaml(`./dist/locales/${locale}/${componentName}.yaml`);
};
