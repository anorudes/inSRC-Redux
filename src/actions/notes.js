import { DB_PATH } from '../constants';
import { nw, fs } from '../nw.js';

export function searchNotes(text) {
  return {
    type: 'SEARCH_NOTES',
    text,
  };
}

export function openNote(note) {
  return {
    type: 'OPEN_NOTE',
    note,
  };
}

export function closeNote() {
  return {
    type: 'CLOSE_NOTE',
  };
}

export function getNotes(notes) {
  return {
    type: 'GET_NOTES',
    notes,
  };
}

export function saveNote(note) {
  return {
    type: 'SAVE_NOTE',
    note,
  };
}

export function addNote(note) {
  return {
    type: 'ADD_NOTE',
    note,
  };
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    id,
  };
}

export function saveScroll(data) {
  return {
    type: 'SAVE_SCROLL',
    data,
  };
}

export function saveNotes(notes) {
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
  fs.writeFileSync(DB_PATH, JSON.stringify(res));
}
export function fetchNotes() {
  // for nw.js
  const toLower = (data) => {
    for (const item of data) {
      item.keywordsL = item.keywords.toLowerCase();
      item.titleL = item.title.toLowerCase();
      item.textL = item.text.toLowerCase();
    }
    return data;
  };
  if (nw) {
    return dispatch => {
      let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      data = toLower(data);
      dispatch(getNotes(data));
    };
  } else {
    return dispatch => {
      fetch(DB_PATH)
        .then(res =>
          res.json().then(data =>
            dispatch(getNotes(toLower(data)))
          )
        );
    };
  }
}
