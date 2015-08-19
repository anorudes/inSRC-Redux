import u from 'updeep';

const initialState = {
  notes: [],
  openNote: {},
  scrollY: 0,
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
      openNote: action.note,
    }

  case 'CLOSE_NOTE':
    return {
      ...state,
      openNote: {}
    }

  case 'SAVE_NOTE':
    let index = state.notes.map(x => x.id).indexOf(action.note.id);
    return u({
      notes: { [index]: action.note },
      openNote: action.note,
    }, state);

  case 'ADD_NOTE':
    return state;

  case 'DELETE_NOTE':
    return state;

  case 'SAVE_SCROLL':
    return {
      ...state,
      scrollY: window.scrollY
    }
  default:
    return state;
  }
}
