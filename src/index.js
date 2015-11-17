import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import history from './history';
import routes from './routes';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={history} children={routes} />
  </Provider>,
  document.getElementById('root')
);
