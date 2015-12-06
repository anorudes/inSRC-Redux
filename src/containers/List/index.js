import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from 'actions/notes';
import { Notes, SearchNotes } from 'components';

@connect(
  state => state.notes,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class List extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    notes: React.PropTypes.array,
    fetchNotes: React.PropTypes.func,
  }

  componentDidMount() {
    if (!this.props.notes.length) {
      this.props.fetchNotes();
    }
  }

  render() {
    return (
      <div>
        <SearchNotes {...this.props} />
        <Notes {...this.props} />
      </div>
    );
  }
}
