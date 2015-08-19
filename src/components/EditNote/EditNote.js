import React, { Component } from 'react';
import { dispatch } from 'App';

// Component styles
import styles from './EditNote.styles.js';

// Actions
import { saveNote } from 'actions';

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
