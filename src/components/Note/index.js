import React, { Component } from 'react';
import classNames from 'classnames';

// Component styles
import styles from './styles';

export class Note extends Component {
  static propTypes = {
    note: React.PropTypes.object,
    active: React.PropTypes.any,
    actions: React.PropTypes.object,
  }

  render() {
    const { note, active, actions } = this.props;
    const classes = classNames(styles, { active: active });

    return (
      <div className={classes} onClick={() => actions.openNote(note)}>
        <span className="title">{note.title}</span>
        <span className="keywords">{note.keywords}</span>
      </div>
    );
  }
}
