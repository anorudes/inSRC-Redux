import u from 'updeep';
import { saveNotes } from 'actions/notes';
const initialState = {
  notes: [],
  openNote: {},
  scrollY: 0,
  searchText: "",
};

export function notes(state = initialState, action) {
  let res;

  switch (action.type) {
  case 'SEARCH_NOTES':
    return {
      ...state,
      searchText: action.text,
    }

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
    res = u({
      notes: { [index]: action.note },
      openNote: action.note,
    }, state);
    saveNotes(res.notes);
    return res;

  case 'ADD_NOTE':
    let getMaxId = () => {
      return Math.max.apply(Math, state.notes.map(el => el.id));
    };
    let id = getMaxId() + 1;
    res = {
      ...state,
      notes: [{
        id: id,
        title: action.note.title,
        keywords: action.note.keywords,
        text: action.note.text,
      }, ...state.notes]
    };
    saveNotes(res.notes);
    return res;

  case 'DELETE_NOTE':
    var index = state.notes.map(x => x.id).indexOf(action.id);
    console.log(index);
    res = {
      openNote: {},
      scrollY: state.scrollY,
      searchText: state.searchText,
      notes: [
        ...state.notes.slice(0, index),
        ...state.notes.slice(index + 1)
      ],
    };
    saveNotes(res.notes);
    return res;

  case 'SAVE_SCROLL':
    res = {
      ...state,
      scrollY: window.scrollY,
    }
    saveNotes(res.notes);
    return res;

  default:
    return state;
  }
}
