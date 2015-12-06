import u from 'updeep';
import { saveNotes } from 'actions/notes';
import { trim } from 'utils/notes';
import { nw, win } from '../nw.js';

const initialState = {
  notes: [],
  activeNote: {},
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
      activeNote: {},
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
      activeNote: action.payload,
    };

  case 'CLOSE_NOTE':
    return {
      ...state,
      activeNote: {},
    };

  case 'SAVE_NOTE':
    index = state.notes.map(note => note.id).indexOf(action.payload.id);
    action.payload = {
      ...action.payload,
      text: trim(action.payload.text),
      keywordsL: action.payload.keywords.toLowerCase(),
      titleL: action.payload.title.toLowerCase(),
      textL: action.payload.text.toLowerCase(),
    };
    res = u({
      notes: { [index]: action.payload },
      activeNote: action.payload,
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
    nw && win.hide();
    return res;

  case 'DELETE_NOTE':
    index = state.notes.map(note => note.id).indexOf(action.id);
    res = {
      activeNote: {},
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
