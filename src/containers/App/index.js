import React from 'react';

// Bootstrap
import 'bootstrap-webpack';

// Global styles
import './styles';

// Application components
import { Header, Footer } from 'components';

export const App = (props) => (
  <section>
    <Header />
      { props.children }
    <Footer />
  </section>
);
