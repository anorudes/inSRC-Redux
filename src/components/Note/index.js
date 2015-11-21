import React, { Component } from 'react';
import classNames from 'classnames';

// Component styles
import styles from './styles';

export class Note extends Component {
  static propTypes = {
    note: React.PropTypes.object,
    active: React.PropTypes.any,
    openNote: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.openNote(this.props.note);
  }

  render() {
    const { note, active } = this.props;
    const classes = classNames(styles, { active: active });

    return (
      <div className={classes} onClick={this.onClick}>
        <span className="title">{note.title}</span>
        <span className="keywords">{note.keywords}</span>
      </div>
    );
  }
}
