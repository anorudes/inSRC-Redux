import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { configInit } from './config';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchNotes } from 'actions/notes';
import history from './history';
import routes from './routes';

/* config */
configInit(store.dispatch);
store.dispatch(fetchNotes());

ReactDOM.render(
  <Provider store={ store }>
    <Router history={history} children={routes} />
  </Provider>,
  document.getElementById('root')
);
