import React, { Component } from 'react';

// Component styles
import styles from './SearchNotes.styles.js';
import { dispatch } from 'App';
import { searchNotes } from 'actions';

export default class SearchNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  _changeSearch() {
    const input = event.target;
    this.setState({ search: input.value});
    this.props.dispatch(searchNotes(input.value));
  }
  render() {
    return (
      <div className={styles}>
        <input type="text" ref="search" value={this.state.search} onChange={() => this._changeSearch()} placeholder="search" />
      </div>
    );
  }
}
