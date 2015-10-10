import React from 'react';
import { Link } from 'react-router';

export const Header = () => (
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
      </ul>
    </div>
  </div>
);
