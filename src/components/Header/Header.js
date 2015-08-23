import React, { Component } from 'react';
import { Link } from 'react-router';

// Component styles
import styles from './styles.js';
export default class Header extends Component {
  render() {
    return (
      <div className={`${ styles }`} >
        <div className="wrapper">
            <span className="title">
              <Link to={`/list/`}>inSRC</Link>
            </span>
          <ul className="menu">
            <li>
              <Link to={`/list/`}>
                <i className="icon fa fa-list"></i>
                List
              </Link>
            </li>
            <li>
              <Link to={`/add/`}>
                <i className="icon fa fa-edit"></i>
                Add
              </Link>
            </li>
            <li>
              <Link to={`/options/`}>
                <i className="icon fa fa-cog"></i>
                Options
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
