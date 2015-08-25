import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Component styles
import styles from './styles.js';
import { Note, NoteFull, SearchNotes } from 'components';
import * as actionCreators from 'actions/notes';
import * as filters from './filters';

@connect(state => state.notes)
export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }
  componentWillUnmount() {
    this.actions.saveScroll();
  }

  componentDidMount() {
    const { scrollY } = this.props;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 1);
  }

  render() {
    let { openNote, searchText } = this.props;
    searchText = searchText.toLowerCase();
    let searchInCode = false;
    if (searchText.indexOf('@') >= 0) {
      searchText = searchText.split('@').join('');
      searchInCode = true;
    }
    const notes = this.props.notes.filter(note => {
      return filters.search(note, searchText.split(' '), searchInCode);
    });
    openNote = notes.length === 1 ? notes[0] : openNote;
    return (
      <div className={styles} >
        <SearchNotes actions={this.actions} />
        {notes.map(note => <Note key={note.id}
                                  active={note === openNote}
                                  note={note}
                                  actions={this.actions}/>)}
        {openNote.id && <NoteFull note={openNote} actions={this.actions} />}
      </div>
    );
  }
}
