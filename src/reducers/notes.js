import createReducer from './lib/createReducer';

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

export default createReducer(initialState, {
  ['SEARCH_NOTES'](state, { text }) {
    return state
      .update('activeNote', () => Object.create({}))
      .update('searchText', () => text);
  },

  ['GET_NOTES'](state, { notes }) {
    return state.update('notes', () => notes);
  },

  ['OPEN_NOTE'](state, { note }) {
    return state.update('activeNote', () => note);
  },

  ['CLOSE_NOTE'](state) {
    return state.update('activeNote', () => Object.create({}));
  },

  ['SAVE_NOTE'](state, { note }) {
    const res = state
      .update('notes', notes => notes.map(item => {
        if (item.id === note.id) {
          item = {
            ...note,
            text: trim(note.text),
            keywordsL: note.keywords.toLowerCase(),
            titleL: note.title.toLowerCase(),
            textL: note.text.toLowerCase(),
          };
        }
        return item;
      }))
      .update('activeNote', () => note);
    saveNotes(res.toJS().notes);
    return res;
  },

  ['ADD_NOTE'](state, { note }) {
    const getMaxId = () => {
      return Math.max.apply(Math, state.toJS().notes.map(item => item.id));
    };
    const id = getMaxId() + 1;
    const res = state
      .update('notes', notes => {
        notes.unshift({
          id: id,
          title: note.title,
          titleL: note.title.toLowerCase(),
          keywords: note.keywords,
          keywordsL: note.keywords.toLowerCase(),
          text: trim(note.text),
          textL: note.text.toLowerCase(),
          date: note.date,
        });
        return notes;
      });
    saveNotes(res.toJS().notes);
    nw && win.hide();
    return res;

  },

  ['DELETE_NOTE'](state, { id }) {
    const res = state
      .update('activeNote', () => Object.create({}))
      .update('notes', notes => notes.filter(note => note.id !== id));
    saveNotes(res.toJS().notes);
    return res;
  },

  ['SAVE_SCROLL'](state) {
    return state.update('scrollY', () => window.scrollY);
  },
});

