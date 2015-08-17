import React, { Component } from 'react';

// Component styles
import styles from './styles.js';
export default class Header extends Component {
  render() {
    return (
      <div className={ `${ styles }`} >
        <div className="wrapper">
          <span className="title">inSRC</span>
          <ul className="menu">
            <li>
              <i className="icon fa fa-list"></i>
              List
            </li>
            <li>
              <i className="icon fa fa-list"></i>
              Add
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
