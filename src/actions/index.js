import store from '../App.js';

export function action(type, object) {
  store.dispatch({type: type, ...object});
}

export function saveScoll() {
  return {
    type: 'SAVE_SCROLL',
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

export function getNotes(data) {
  return {
    type: 'GET_NOTES',
    data,
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

export function fetchNotes() {
  return dispatch => {
    fetch('/db/data.json')
      .then(res =>
        res.json().then(data => dispatch(getNotes(data)))
      );
  }
}

export function deleteNote(note) {
  return {
    type: 'DELETE_NOTE',
    note,
  };
}
