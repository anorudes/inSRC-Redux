import React, { Component } from 'react';
import Highlight from 'react-highlight';
import classNames from 'classnames';
// Component styles
import styles from './NoteFull.styles.js';
import { saveNote, closeNote } from 'actions/notes';

import { Link } from 'react-router';

export default class NoteFull extends Component {
  constructor(props) {
    super(props);
    this.state = { closeAnimate: false, editable: false, updatedNote: {} };
  }
  _close() {
    this.setState({closeAnimate: true});
    setTimeout(() => {
      this.props.actions.closeNote();
    }, 500);
  }
  _openEdit(note) {
    this.setState({ editable: true, updatedNote: {...note} });
  }
  _updateInput(ref) {
    const input = event.target;
    this.setState({
      updatedNote: {
        ...this.state.updatedNote,
        [ref]: input.value,
      },
    });
  }
  _saveNote() {
    this.props.actions.saveNote(this.state.updatedNote);
    this.setState({ editable: false, updatedNote: {}});
  }

  render() {
    const { note, actions } = this.props;
    const { editable, updatedNote } = this.state;

    const classes = classNames(styles, { closeAnimate: this.state.closeAnimate });
    return (
      <div className={classes} >
        <div className="close fa fa-times" onClick={() => this._close()}></div>
        { /* show note code */}
        { !editable &&
          <div>
            <span className="title">{note.title}</span>
            <div className="code">
              <Highlight className="language-js">
                {note.text}
              </Highlight>
            </div>
            <span className="keywords">{note.keywords}</span>
            <span className="date">{note.date}</span>
            <div className="buttons">
              <i className="icon fa fa-edit" onClick={() => this._openEdit(note)}></i>
              <i className="icon fa fa-trash-o" onClick={() => actions.deleteNote(note.id)}></i>
            </div>
          </div>
        }

        {/* edit note code */}
        { editable &&
          <div>
            <div className="form">
              <div className="field title">
                <input type="text" ref="title" value={updatedNote.title} onChange={() => this._updateInput('title')} />
              </div>
              <div className="field text">
                <textarea ref="text" onChange={() => this._updateInput('text')}>{updatedNote.text}</textarea>
              </div>
              <div className="field keywords">
                <input type="text" ref="keywords" value={updatedNote.keywords}  onChange={() => this._updateInput('keywords')} />
              </div>
              <div className="field date">
                <input type="text" ref="date" value={updatedNote.date}  onChange={() => this._updateInput('date')} />
              </div>
              <div className="buttons">
                <button className="icon fa fa-floppy-o" onClick={() => this._saveNote()}></button>
                <button className="icon fa fa-ban" onClick={() => this.setState({ editable: false })}></button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
