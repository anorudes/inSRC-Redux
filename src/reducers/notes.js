import u from 'updeep';
import { saveNotes } from 'actions/notes';
import { trim } from 'tools';

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
      openNote: {},
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
    action.note.text = trim(action.note.text);
    action.note.keywordsL = action.note.keywords.toLowerCase();
    action.note.titleL = action.note.title.toLowerCase();
    action.note.textL = action.note.text.toLowerCase();
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
        titleL: action.note.title.toLowerCase(),
        keywords: action.note.keywords,
        keywordsL: action.note.keywords.toLowerCase(),
        text: trim(action.note.text),
        textL: action.note.text.toLowerCase(),
        date: action.note.date,
      }, ...state.notes]
    };
    saveNotes(res.notes);
    window.globalConfig.nw && win.hide();
    return res;

  case 'DELETE_NOTE':
    var index = state.notes.map(x => x.id).indexOf(action.id);
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
