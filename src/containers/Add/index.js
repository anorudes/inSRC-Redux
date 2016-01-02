import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from 'actions/notes';
import { AddNote } from 'components';

@connect(
  state => state.notes.toJS(),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Add extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    notes: React.PropTypes.array,
  }

  render() {
    return (
      <AddNote {...this.props} />
    );
  }
}
