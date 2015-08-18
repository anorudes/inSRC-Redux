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
    data
  };
}

export function addNote(id) {
  return {
    type: 'ADD_NOTE',
    id,
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

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    id,
  };
}
