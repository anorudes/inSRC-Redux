import React, { Component } from 'react';
import Highlight from 'react-highlight';
import classNames from 'classnames';
// Component styles
import styles from './NoteFull.styles.js';
import { saveNote, closeNote } from 'actions/notes';

import { Link } from 'react-router';



let linkAndBold = (text) => {
  let replacedText, replacePattern1, replacePattern2;
  replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
  if (nw) {
    replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="javascript: gui.Shell.openExternal(\'$1\')">$1</a>');
  } else {
    replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
  }

  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  if (nw) {
    replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="javascript: gui.Shell.openExternal(\'http://$2\')">$2</a>');
  } else {
    replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');
  }

  replacedText = replacedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  return replacedText;
}

export default class NoteFull extends Component {
  constructor(props) {
    super(props);
    this.state = { closeAnimate: false, editable: false, updatedNote: {} };
  }
  componentDidMount() {
    this._linkAndBold();
  }
  componentDidUpdate() {
    if (!this.state.editable) {
      this._linkAndBold();
    }
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
  _delete(note) {
    if (window.confirm("Do you really want to delete?")) {
      this.props.actions.deleteNote(note.id);
      nw && win.focus();
    }
  }
  _linkAndBold() {
    let element = React.findDOMNode(this.refs.code);
    let code = element.innerHTML;
    code = code.split('https:<span class="hljs-comment">').join('https:');
    code = code.split('http:<span class="hljs-comment">').join('http:');
    element.innerHTML = linkAndBold(code);
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
    let codes = note.text.split('---');
    return (
      <div className={classes} id="noteFull">
        <div className="close fa fa-times" onClick={() => this._close()}></div>
        { /* show note code */}
        { !editable &&
          <div>
            <span className="title">{note.title}</span>
            <div className="code" ref="code">
              {
                codes.map((code) => {
                    return (<Highlight className="language-js">{code}</Highlight>)
                })
              }
            </div>
            <span className="keywords">{note.keywords}</span>
            <span className="date">{note.date}</span>
            <div className="buttons">
              <i className="icon fa fa-edit" onClick={() => this._openEdit(note)}></i>
              <i className="icon fa fa-trash-o" onClick={() => this._delete(note) }></i>
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
