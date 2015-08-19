import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'App';
// Component styles
import styles from './styles.js';
import { Note, NoteFull, SearchNotes } from 'components';
import { fetchNotes, saveScroll } from 'actions';
import * as filters from './filters';

@connect(state => state.notes)
export default class Notes extends Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    dispatch(saveScroll());
  }

  componentDidMount() {
    const { scrollY } = this.props;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 1);
    dispatch(fetchNotes());
  }

  render() {
    let { openNote, searchText } = this.props;
    searchText = searchText.toLowerCase();
    let searchInCode = false;
    if (searchText.indexOf('@@') >= 0) {
      searchText = searchText.split('@@').join('');
      searchInCode = true;
    }
    const notes = this.props.notes.filter(note => {
      return filters.search(note, searchText.split(' '), searchInCode);
    });
    return (
      <div className={styles} >
        <SearchNotes />
        {openNote.id && <NoteFull note={openNote} />}
        {notes.map(note => <Note key={note.id}
                                  active={note === openNote}
                                  note={note} />)}
      </div>
    );
  }
}
