import React, { Component } from 'react';
import { Link } from 'react-router';

import 'bootstrap-webpack';

// Global styles
import 'style!./styles/main.scss';

// Application components
import { Header, Typography, Footer } from 'components';

export default class Main extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  };

  render() {
    return (
      <section>
        <Header />
        <div className="container">
          <div className="row">
              { this.props.children }
            </div>
          </div>
        <Footer />
      </section>
    );
  }
}
