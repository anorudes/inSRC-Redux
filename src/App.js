import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Main from './Main';
import * as reducers from './reducers';
import logger from 'redux-logger';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import { Notes, EditNote, AddNote, Options } from './components/';

const reducersApp = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducersApp);

export default store;

export class App extends Component {
  render() {
    return (
        <Provider store={ store }>
          { () =>
            <Router history={history}>
              <Route path="/" component={Main}>
                <Route path="list" component={Notes}></Route>
                <Route path="edit" component={EditNote}></Route>
                <Route path="add" component={AddNote}></Route>
                <Route path="options" component={Options}></Route>
              </Route>
            </Router>
          }
        </Provider>
    );
  }
}
