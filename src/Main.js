import React, { Component } from 'react';
import { Link } from 'react-router';

import 'bootstrap-webpack';

// Global styles
import 'style!./styles/main.scss';
import 'style!./styles/buttons.scss';
import 'style!./styles/forms.scss';

// Application components
import { Header, Footer } from 'components';

export default class Main extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  };

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

