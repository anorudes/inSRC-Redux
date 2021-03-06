import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Component styles
import { styles } from './styles.scss';
import { Note, NoteFull } from 'components';
import { search } from 'utils/notes';

export class Notes extends Component {
  static propTypes = {
    searchText: React.PropTypes.string,
    scrollY: React.PropTypes.number,
    notes: React.PropTypes.array,
    deleteNote: React.PropTypes.func,
    activeNote: React.PropTypes.object,
    openNote: React.PropTypes.func,
    saveScroll: React.PropTypes.func,
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
    this.props.saveScroll();
  }

  render() {
    let { activeNote, searchText } = this.props;
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
    activeNote = notes.length === 1 ? notes[0] : activeNote;
    let count = 0;
    return (
      <div className={styles}>
        {notes.map(note => {
          count++;
          return count <= 100
            ? <Note key={note.id}
                active={note === activeNote}
                note={note}
                openNote={this.props.openNote} />
            : null;
        })}
        <ReactCSSTransitionGroup
            transitionName="note-full"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
          {activeNote.id &&
            <NoteFull
                      key={activeNote}
                      note={activeNote}
                      saveNote={this.props.saveNote}
                      closeNote={this.props.closeNote}
                      deleteNote={this.props.deleteNote} />}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
