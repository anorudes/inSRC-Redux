import React from 'react';
import { Route } from 'react-router';
import * as containers from './containers';

const {
  App,
  Add,
  List,
  Options,
} = containers;

export default (
  <Route path="/" component={App}>
    <Route path="list" component={List} />
    <Route path="add" component={Add} />
    <Route path="options" component={Options} />
  </Route>
);
