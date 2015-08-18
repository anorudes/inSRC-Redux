import React, { Component } from 'react';

// Component styles
import styles from './AddNote.styles.js';

// Actions
import { addNote } from 'actions';

export default class AddNote extends Component {
  render() {
    const { dispatch, data } = this.props;
    
    return (
      <div className={styles} >
        <h2>
          AddNote
        </h2>
        <p>
          Data: {data}
        </p>
      </div>
    );
  }
}
