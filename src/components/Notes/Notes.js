import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component styles
import styles from './styles.js';
import { Note } from 'components';
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
    const { notes, activeNote } = this.props;

    return (
      <div className={ `${ styles }`} >
        {
          notes.map(note => <Note active={ note.id === activeNote } note={ note } {...this.props} />)
        }
      </div>
    );
  }
}
