import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { notes } from './notes';
import { config } from './config';

const rootReducer = combineReducers({
  form: formReducer,
  notes,
  config,
});

export default rootReducer;
