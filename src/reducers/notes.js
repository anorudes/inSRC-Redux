const initialState = {
  notes: [],
  activeNote: {}
};

export function notes(state = initialState, action) {
  let newState = {
    notes: [...state.notes],
    activeNote: {...state.activeNote},
  };

  switch (action.type) {

  case 'GET_NOTES':
    return {
      ...state,
      notes: action.data
    }

  case 'OPEN_NOTE':
    return {
      ...state,
      activeNote: action.note,
    }

  case 'CLOSE_NOTE':
    return {
      ...state,
      activeNote: {}
    }

  case 'SAVE_NOTE':
    let index = state.notes.map(x => x.id).indexOf(action.note.id);
    newState.notes[index] = action.note;
    newState.activeNote = action.note;
    return newState;

  case 'ADD_NOTE':
    return state;

  case 'DELETE_NOTE':
    return state;

  default:
    return state;
  }
}
