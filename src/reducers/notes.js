import u from 'updeep';
import { saveNotes } from 'actions/notes';
import { trim } from 'tools';

const initialState = {
  notes: [],
  openNote: {},
  scrollY: 0,
  searchText: '',
};

export function notes(state = initialState, action) {
  let res;
  let index;

  switch (action.type) {
  case 'SEARCH_NOTES':
    return {
      ...state,
      openNote: {},
      searchText: action.payload,
    };

  case 'GET_NOTES':
    return {
      ...state,
      notes: action.payload,
    };

  case 'OPEN_NOTE':
    return {
      ...state,
      openNote: action.payload,
    };

  case 'CLOSE_NOTE':
    return {
      ...state,
      openNote: {},
    };

  case 'SAVE_NOTE':
    index = state.notes.map(note => note.id).indexOf(action.payload.id);
    action.payload = {
      ...action.payload,
      text: trim(action.payload.text),
      keywordsL: action.payload.keywords.toLowerCase(),
      titleL: action.payload.title.toLowerCase(),
      textL: action.payload.text.toLowerCase()
    }
    res = u({
      notes: { [index]: action.payload },
      openNote: action.payload,
    }, state);
    saveNotes(res.notes);
    return res;

  case 'ADD_NOTE':
    const getMaxId = () => {
      return Math.max.apply(Math, state.notes.map(el => el.id));
    };
    const id = getMaxId() + 1;
    res = {
      ...state,
      notes: [{
        id: id,
        title: action.payload.title,
        titleL: action.payload.title.toLowerCase(),
        keywords: action.payload.keywords,
        keywordsL: action.payload.keywords.toLowerCase(),
        text: trim(action.payload.text),
        textL: action.payload.text.toLowerCase(),
        date: action.payload.date,
      }, ...state.notes],
    };
    saveNotes(res.notes);
    window.globalConfig.nw && win.hide();
    return res;

  case 'DELETE_NOTE':
    index = state.notes.map(note => note.id).indexOf(action.id);
    res = {
      openNote: {},
      scrollY: state.scrollY,
      searchText: state.searchText,
      notes: [
        ...state.notes.slice(0, index),
        ...state.notes.slice(index + 1),
      ],
    };
    saveNotes(res.notes);
    return res;

  case 'SAVE_SCROLL':
    res = {
      ...state,
      scrollY: window.scrollY,
    };
    return res;

  default:
    return state;
  }
}
