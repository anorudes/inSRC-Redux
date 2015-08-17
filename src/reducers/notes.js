const initialState = [];

export function notes(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case 'ADD_NOTE':
      return newState;

    case 'DELETE_NOTE':
      return newState;

    default:
      return state;
  }
}
