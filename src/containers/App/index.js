import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { nw } from '../../nw.js';


// Bootstrap
import 'bootstrap-webpack';

// Global styles
import './styles';

// Application components
import { Header, Footer } from 'components';

import { Hotkeys, Tray } from 'utils/nw';
import hljs from 'highlight.js/lib/highlight';
import * as actionCreators from 'actions/config';

@connect(
  state => state,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class App extends Component {
  static propTypes = {
    fetchConfig: React.PropTypes.func,
    children: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchConfig((data) => {
      hljs.configure({
        tabReplace: '  ',
      });
      if (nw) {
        Hotkeys.init(data);
        Tray.init(data);
      }
    });
  }

  render() {
    return (
      <section>
        <Header />
          { this.props.children }
        <Footer />
      </section>
    );
  }
}

