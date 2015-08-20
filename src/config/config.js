import Hotkeys from './hotkeys';
import Tray from './tray';
import { getConfig } from 'actions/config';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers';
import logger from 'redux-logger';
const reducersApp = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducersApp);

export let Config = {
  data: {},
  load() {
    return fetch('/config.json')
      .then(res =>
        res.json().then(data => this.data = data).then((data) => {
          nw && Hotkeys.init();
          nw && Tray.init();
          store.dispatch(getConfig(data));
        })
    );
  }
};
