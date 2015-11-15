import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from 'actions/notes';
import { AddNote } from 'components';

@connect(state => state.notes)
export class Add extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }

  static propTypes = {
    dispatch: React.PropTypes.func,
    notes: React.PropTypes.array,
  }

  render() {
    return (
      <AddNote actions={this.actions} notes={this.props.notes} dispatch={this.props.dispatch} />
    );
  }
}
