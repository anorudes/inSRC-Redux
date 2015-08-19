import React, { Component } from 'react';
import debounce from 'lodash.debounce';

// Component styles
import styles from './SearchNotes.styles.js';
import { searchNotes } from 'actions/notes';

export default class SearchNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  componentDidMount() {
    React.findDOMNode(this.refs.search).focus();
  }

  _changeSearch() {
    const input = event.target;
    this.setState({ search: input.value});
    debounce(() => this.props.actions.searchNotes(input.value), 100)();
  }

  render() {
    return (
      <div className={styles}>
        <input type="text" ref="search" value={this.state.search} onChange={() => this._changeSearch()} placeholder="search" />

      </div>
    );
  }
}
