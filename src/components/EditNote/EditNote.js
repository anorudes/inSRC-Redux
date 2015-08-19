import React, { Component } from 'react';

// Component styles
import styles from './EditNote.styles.js';

// Actions
import { saveNote } from 'actions/notes';

export default class EditNote extends Component {
  render() {
    const { data } = this.props;
    
    return (
      <div className={styles} >
        <h2>
          EditNote
        </h2>
        <p>
          Data: {data}
        </p>
      </div>
    );
  }
}
