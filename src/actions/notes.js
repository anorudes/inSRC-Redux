/* global fs */

import{ createAction } from 'redux-actions';

const dbPath = window.globalConfig.execPath + 'db/data.json';

export const searchNotes = createAction('SEARCH_NOTES');
export const saveScroll = createAction('SAVE_SCROLL');
export const openNote = createAction('OPEN_NOTE');
export const closeNote = createAction('CLOSE_NOTE');
export const getNotes = createAction('GET_NOTES');
export const saveNote = createAction('SAVE_NOTE');
export const addNote = createAction('ADD_NOTE');
export const deleteNote = createAction('DELETE_NOTE');

export function saveNotes(notes) {
  if (window.globalConfig.nw) {
    const res = [];
    for (const note of notes) {
      res.push({
        id: note.id,
        title: note.title,
        keywords: note.keywords,
        text: note.text,
        date: note.date,
      });
    }
    fs.writeFileSync(dbPath, JSON.stringify(res));
  }
}
export function fetchNotes() {
  // for nw.js
  const _toLower = (data) => {
    for (const item of data) {
      item.keywordsL = item.keywords.toLowerCase();
      item.titleL = item.title.toLowerCase();
      item.textL = item.text.toLowerCase();
    }
    return data;
  };
  if (window.globalConfig.nw) {
    return dispatch => {
      let data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      data = _toLower(data);
      dispatch(getNotes(data));
    };
  } else {
    return dispatch =>
      fetch(dbPath)
        .then(res => res.json()
          .then(data => dispatch(getNotes(_toLower(data))))
      );
  }
}
