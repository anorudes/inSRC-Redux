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
    this.state = { closeAnimate: false, editable: false }
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
    const { editable } = this.state;

    let classes = classNames(styles, { closeAnimate: this.state.closeAnimate });
    return (
      <div className={ classes } >
        <div className="close fa fa-times" onClick={ () => this._close() }></div>
        <span className="title">{note.title}</span>
        { /* show note code */ }
        { !editable &&
          <div>
            <div className="code">
              <Highlight className="language-js">
                {note.text}
              </Highlight>
            </div>
            <span className="keywords">{note.keywords}</span>
            <span className="date">{note.date}</span>
            <div className="buttons">
              <i className="icon fa fa-edit" onClick={ () => this.setState({ editable: true }) }></i>
              <i className="icon fa fa-trash-o" onClick={ () => dispatch(deleteNote(note.id)) }></i>
            </div>
          </div>
        }

        { /* edit note code */ }
        { editable &&
          <div>
            <div className="buttons">
              <button className="btn--save">save</button>
              <button className="btn--cancel">cancel</button>
            </div>
          </div>
        }


      </div>
    );
  }
}
