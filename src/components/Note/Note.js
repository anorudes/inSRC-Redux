import React, { Component } from 'react';

// Component styles
import styles from './Note.styles.js';

export default class Note extends Component {
  render() {
    const { note } = this.props;
    return (
      <div className={ styles } >
        <span className="title">{ note.title }</span>
        <span className="keywords">{ note.keywords }</span>
      </div>
    );
  }
}
