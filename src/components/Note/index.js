import React, { Component } from 'react';
import classNames from 'classnames';
// Component styles
import styles from './styles';

export class Note extends Component {
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
