import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as containers from './containers';

const {
  App,
  Add,
  List,
  Options,
} = containers;

export default (
  <Route path="/" component={App}>
    <IndexRoute component={List}/>
    <Route path="list" component={List} />
    <Route path="add" component={Add} />
    <Route path="options" component={Options} />
  </Route>
);
