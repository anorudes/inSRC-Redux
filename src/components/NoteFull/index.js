import React, { Component } from 'react';
// TODO: import Highlight from 'react-highlight';
import { Highlight } from './highlight-empty';
import classNames from 'classnames';
import { trim } from 'tools';

// Component styles
import styles from './styles';

import { linkAndBold } from './_linkAndBold.js';

export class NoteFull extends Component {
  static propTypes = {
    note: React.PropTypes.object,
    actions: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { noteId: -1, noteText: trim(this.props.note.text), closeAnimate: false, editable: false, updatedNote: {} };
  }

  componentDidMount() {
    this.setState({noteId: this.props.note.id});
    this._linkAndBold();
  }

  componentDidUpdate() {
    if (this.state.noteId !== this.props.note.id) {
      if (!this.state.editable) {
        this._linkAndBold();
      }
      this.setState({noteId: this.props.note.id, noteText: trim(this.props.note.text)});
    }
  }

  _close() {
    this.setState({closeAnimate: true});
    setTimeout(() => {
      this.props.actions.closeNote();
    }, 500);
  }

  _openEdit(note) {
    this.setState({ editable: true, updatedNote: {
      ...note,
      text: trim(note.text)}});
  }

  _delete(note) {
    if (window.confirm('Do you really want to delete?')) {
      this.props.actions.deleteNote(note.id);
      window.globalConfig.nw && win.focus();
    }
  }

  _linkAndBold() {
    setTimeout(() => {
      let code = this.refs.code.innerHTML;
      code = code.replace(/http(s?):(<span class="hljs-comment">)+/g, 'http:');
      this.refs.code.innerHTML = linkAndBold(code);
    }, 10);
  }

  _updateInput(e, ref) {
    const input = e.target;
    this.setState({
      updatedNote: {
        ...this.state.updatedNote,
        [ref]: input.value,
      },
    });
  }

  _saveNote() {
    this.props.actions.saveNote(this.state.updatedNote);
    this.setState({ editable: false, updatedNote: {}, noteText: trim(this.state.updatedNote.text), noteStyled: false});
  }

  render() {
    const { note } = this.props;
    const { editable, updatedNote } = this.state;
    const classes = classNames(styles, { closeAnimate: this.state.closeAnimate });
    const noteText = this.state.noteText;
    return (
      <div className={classes} id="noteFull">
        <div className="close fa fa-times" onClick={() => this._close()}></div>
        { /* show note code */}
        { !editable &&
          <div>
            <span className="title">{note.title}</span>
            <div className="code" ref="code">
              {
                noteText.split('---').map((code, i) => {
                  if (code.length) {
                    let lang = (code.match(/^(js|html|css|php|auto|a)\n/m) || ['', 'js'])[1];
                    if (lang !== 'js' && lang !== 'html' && lang !== 'css' && lang !== 'php' && lang !== 'auto' && lang !== 'a') {
                      lang = 'js';
                    }
                    code = code.replace(new RegExp('^(js|html|css|php|auto|a)\n'), '');
                    if (lang === 'auto' || lang === 'a') {
                      return (<span key={i}><Highlight>{code}</Highlight><br /></span>);
                    } else {
                      return (<span key={i}><Highlight className={'language-' + lang}>{code}</Highlight><br /></span>);
                    }
                  }
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
                <input type="text" ref="title" defaultValue={updatedNote.title} onChange={(e) => this._updateInput(e, 'title')} />
              </div>
              <div className="field text">
                <textarea ref="text" onChange={(e) => this._updateInput(e, 'text')} defaultValue={updatedNote.text} />
              </div>
              <div className="field keywords">
                <input type="text" ref="keywords" defaultValue={updatedNote.keywords} onChange={(e) => this._updateInput(e, 'keywords')} />
              </div>
              <div className="field date">
                <input type="text" ref="date" defaultValue={updatedNote.date} onChange={(e) => this._updateInput(e, 'date')} />
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
