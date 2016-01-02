import createReducer from './lib/createReducer';

const initialState = {
  config: {},
};

export default createReducer(initialState, {
  ['GET_CONFIG'](state, { data }) {
    return state.update('config', () => data);
  },
});
