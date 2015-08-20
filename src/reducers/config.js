import u from 'updeep';

const initialState = {
  config: {}
};

export function config(state = initialState, action) {
  switch (action.type) {
  case 'GET_CONFIG':
    return {
      ...state,
      config: action.data
    }
  default:
    return state;
  }
}
