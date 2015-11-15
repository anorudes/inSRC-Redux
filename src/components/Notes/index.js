import React, { Component } from 'react';

// Component styles
import styles from './styles';
import { Note, NoteFull } from 'components';
import { search } from 'tools';

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
  }

  componentDidMount() {
    const { scrollY } = this.props;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 1);
  }

  componentWillUnmount() {
    this.props.actions.saveScroll();
  }

  render() {
    let { openNote, searchText } = this.props;
    let searchInCode = false;
    /* find in code */
    if (searchText.indexOf('@') >= 0) {
      searchText = searchText.split('@').join('');
      searchInCode = true;
    }
    searchText = searchText.toLowerCase();

    /* generate array words from text */
    const notes = this.props.notes.filter(note => {
      return search(note, searchText.split(' '), searchInCode);
    });

    /* open efault first note in list */
    openNote = notes.length === 1 ? notes[0] : openNote;
    return (
      <div className={styles}>
        {notes.map(note => <Note key={note.id}
                                  active={note === openNote}
                                  note={note}
                                  actions={this.actions}/>)}
        {openNote.id && <NoteFull note={openNote} actions={this.props.actions} />}
      </div>
    );
  }
}
