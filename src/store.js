import { bindActionCreators, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
import logger from 'redux-logger';
const reducersApp = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);
export const store = createStoreWithMiddleware(reducersApp);