import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { default as notes } from './notes';
import { default as config } from './config';

const rootReducer = combineReducers({
  form: formReducer,
  notes,
  config,
});

export default rootReducer;
