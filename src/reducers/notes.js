import u from 'updeep';

const initialState = {
  notes: [],
  activeNote: {}
};

export function notes(state = initialState, action) {
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
    return u({
      notes: { [index]: action.note },
      activeNote: action.note,
    }, state);

  case 'ADD_NOTE':
    return state;

  case 'DELETE_NOTE':
    return state;

  default:
    return state;
  }
}
