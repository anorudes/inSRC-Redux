import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component styles
import styles from './styles.js';
import { Note, NoteFull, SearchNotes } from 'components';
import { fetchNotes } from 'actions';

@connect(state => state.notes)
export default class Notes extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchNotes());
  }

  render() {
    const { notes, openNote, dispatch } = this.props;

    return (
      <div className={styles} >
        <SearchNotes />
        {openNote.id && <NoteFull note={openNote} dispatch={dispatch} />}
        {notes.map(note => <Note key={note.id}
                                  active={note === openNote}
                                  note={note}
                                  dispatch={dispatch} />)}
      </div>
    );
  }
}
