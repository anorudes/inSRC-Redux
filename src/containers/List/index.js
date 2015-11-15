import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from 'actions/notes';
import { Notes, SearchNotes } from 'components';

@connect(state => state.notes)
export class List extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }

  render() {
    return (
      <div>
        <SearchNotes {...this.props} actions={this.actions} />
        <Notes {...this.props} actions={this.actions} />
      </div>
    );
  }
}

