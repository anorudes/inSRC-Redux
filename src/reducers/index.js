import { combineReducers } from 'redux';

import { notes } from './notes';
import { config } from './config';

const rootReducer = combineReducers({
  notes,
  config,
});

export default rootReducer;
