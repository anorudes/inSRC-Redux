import React, { Component } from 'react';
import Main from './Main';
import { Router, Route, history } from 'react-router';
import { Notes, AddNote, Options } from './components/';
import * as actionCreators from 'actions/notes';
import { configInit } from './config';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { fetchNotes } from 'actions/notes';

const actions = bindActionCreators(actionCreators, store.dispatch);
/* config */
configInit(store.dispatch);
store.dispatch(fetchNotes());

export default class App extends Component {
  render() {
    return (
        <Provider store={ store }>
          <Router history={history}>
            <Route path="/" component={Main}>
              <Route path="list" component={Notes}></Route>
              <Route path="add" component={AddNote}></Route>
              <Route path="options" component={Options}></Route>
            </Route>
          </Router>
        </Provider>
    );
  }
}
