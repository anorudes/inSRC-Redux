import React, { Component } from 'react';
import Highlight from 'react-highlight';
import classNames from 'classnames';
// Component styles
import styles from './OpenNote.styles.js';
import { closeNote } from 'actions';

import { Link } from 'react-router';

export default class OpenNote extends Component {
  constructor(props) {
    super(props);
    this.state = { closeAnimate: false }
  }

  _close() {
    const { dispatch } = this.props;
    this.setState({closeAnimate: true})
    setTimeout(() => {
      dispatch(closeNote());
    }, 500);
  }

  _deleteNote() {

  }

  render() {
    const { note, dispatch } = this.props;
    let classes = classNames(styles, { closeAnimate: this.state.closeAnimate });
    return (
      <div className={ classes } >
        <div className="close fa fa-times" onClick={ () => this._close() }></div>
        <span className="title">{note.title}</span>
        <div className="code">
          <Highlight className="language-js">
            {note.text}
          </Highlight>
        </div>
        <span className="keywords">{note.keywords}</span>
        <span className="date">{note.date}</span>
        <div className="buttons">
          <Link to={`/edit/`}>
            <i className="icon fa fa-edit"></i>
          </Link>
          <i className="icon fa fa-trash-o" onClick={ () => _deleteNote() }></i>
        </div>
      </div>
    );
  }
}
