const initialState = {
  notes: [],
  activeNote: -1,
};

export function notes(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {

  case 'GET_NOTES':
    newState.notes = action.data;
    return newState;

  case 'OPEN_NOTE':
    newState.activeNote = action.id;
    return newState;

  case 'CLOSE_NOTE':
    newState.activeNote = -1;
    return newState;

  case 'ADD_NOTE':
    return newState;

  case 'DELETE_NOTE':
    return newState;

  default:
    return state;
  }
}
