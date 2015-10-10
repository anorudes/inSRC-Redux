import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';

import * as actionCreators from 'actions/notes';

// Component styles
import styles from './styles';

@connect(state => state.notes)
export class SearchNotes extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    this.refs.search.focus();
    this.props.actions.searchNotes('');
    this.setState({search: ''});
  }
  componentWillUnmount() {
    this.props.actions.searchNotes('');
    this.setState({search: ''});
  }

  _changeSearch() {
    const input = event.target;
    this.setState({ search: input.value});
    debounce(() => this.props.actions.searchNotes(input.value), 100)();
  }

  render() {
    return (
      <div className={styles}>
        <input type="text" id="search" ref="search" value={this.state.search} onChange={() => this._changeSearch()} placeholder="search" />
      </div>
    );
  }
}
