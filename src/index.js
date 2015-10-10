import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { configInit } from './config';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { fetchNotes } from 'actions/notes';
import createHistory from 'history/lib/createHashHistory';
import routes from './routes';

/* config */
configInit(store.dispatch);
store.dispatch(fetchNotes());

ReactDOM.render(
  <Provider store={ store }>
    <Router history={createHistory()} children={routes} />
  </Provider>
, document.getElementById('App'));
