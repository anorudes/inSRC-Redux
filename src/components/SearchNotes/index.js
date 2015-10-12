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
    this.actions.searchNotes('');
    this.setState({search: ''});
  }

  componentWillUnmount() {
    this.actions.searchNotes('');
    this.setState({search: ''});
  }

  _changeSearch(e) {
    const input = e.target;
    this.setState({ search: input.value});
    debounce(() => this.actions.searchNotes(input.value), 100)();
  }

  render() {
    return (
      <div className={styles}>
        <input type="text" id="search" ref="search" value={this.state.search} onChange={::this._changeSearch} placeholder="search" />
      </div>
    );
  }
}
