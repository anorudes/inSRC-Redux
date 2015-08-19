import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
// Component styles
import styles from './Note.styles.js';

import { openNote } from 'actions/notes';

export default class Note extends Component {
  render() {
    const { note, active, actions } = this.props;
    let classes = classNames(styles, { active: active });

    return (
      <div className={classes} onClick={() => actions.openNote(note)}>
        <span className="title">{note.title}</span>
        <span className="keywords">{note.keywords}</span>
      </div>
    );
  }
}
