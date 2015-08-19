import React from 'react';
import { App } from './App.js';
import { Config } from './config/config';

Config.load().then(() => {
  React.render(<App />, document.getElementById('App'));
});
