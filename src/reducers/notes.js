const initialState = {
  notes: [],
};

export function notes(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
  case 'GET_NOTES':
    console.log(action.data);
    newState.notes = action.data;
    return newState;
  case 'ADD_NOTE':
    return newState;

  case 'DELETE_NOTE':
    return newState;

  default:
    return state;
  }
}
