let dbPath = window.globalConfig.execPath + 'db/data.json';

export function searchNotes(text) {
  return {
    type: 'SEARCH_NOTES',
    text,
  };
}


export function saveScroll() {
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

export function saveNotes(notes) {
  if (window.globalConfig.nw) {
    let res = [];
    for (let note of notes) {
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

export function fetchNotes(callback) {
  // for nw.js
  let _toLower = (data) => {
    for (let item of data) {
      item.keywordsL = item.keywords.toLowerCase();
      item.titleL = item.title.toLowerCase();
      item.textL = item.text.toLowerCase();
    }
    return data;
  }
  if (window.globalConfig.nw) {
    return dispatch => {
      let data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      data = _toLower(data);
      dispatch(getNotes(data));
    }
  } else { // for site
    return dispatch => {
      fetch(dbPath)
        .then(res =>
          res.json().then(data => {
            data = _toLower(data);
            dispatch(getNotes(data));
          })
      );
    }
  }
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    id,
  };
}
