import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Component styles
import styles from './styles';
import { Note, NoteFull } from 'components';
import * as actionCreators from 'actions/notes';
import { search } from 'tools';

@connect(state => state.notes)
export class Notes extends Component {
  static propTypes = {
    openNote: React.PropTypes.object,
    searchText: React.PropTypes.string,
    scrollY: React.PropTypes.number,
    notes: React.PropTypes.array,
    dispatch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }
  
  componentDidMount() {
    const { scrollY } = this.props;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 1);
  }

  componentWillUnmount() {
    this.actions.saveScroll();
  }

  render() {
    let { openNote, searchText } = this.props;
    let searchInCode = false;
    if (searchText.indexOf('@') >= 0) {
      searchText = searchText.split('@').join('');
      searchInCode = true;
    }
    searchText = searchText.toLowerCase();
    const notes = this.props.notes.filter(note => {
      return search(note, searchText.split(' '), searchInCode);
    });
    openNote = notes.length === 1 ? notes[0] : openNote;
    return (
      <div className={styles}>
        {notes.map(note => <Note key={note.id}
                                  active={note === openNote}
                                  note={note}
                                  actions={this.actions}/>)}
        {openNote.id && <NoteFull note={openNote} actions={this.actions} />}
      </div>
    );
  }
}
