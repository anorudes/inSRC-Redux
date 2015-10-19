import React, { Component } from 'react';

import classNames from 'classnames';
import { trim } from 'tools';

// Component styles
import styles from './styles';

import { linkAndBold } from './_linkAndBold';
import { Code } from './_code';

export class NoteFull extends Component {
  static propTypes = {
    note: React.PropTypes.object,
    actions: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { noteId: this.props.note.id, noteText: trim(this.props.note.text), closeAnimate: false, editable: false, updatedNote: {} };
  }

  componentDidMount() {
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
    /* delete note */
    if (window.confirm('Do you really want to delete?')) {
      this.props.actions.deleteNote(note.id);
      window.globalConfig.nw && win.focus();
    }
  }

  _linkAndBold() {
    /* find and make link, bold text */
    setTimeout(() => {
      let code = this.refs.code.innerHTML;
      code = code.replace(/http(s?):(<span class="hljs-comment">)+/g, 'http:');
      this.refs.code.innerHTML = linkAndBold(code);
    }, 10);
  }

  _updateInput(e) {
    const input = e.target;
    const name = input.getAttributeNode('name').value;
    this.setState({
      updatedNote: {
        ...this.state.updatedNote,
        [name]: input.value,
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
    return (
      <div className={classes} id="noteFull">
        <div className="close fa fa-times" onClick={() => this._close()}></div>
        { /* show note code */}
        { !editable &&
          <div>
            <span className="title">{note.title}</span>
            <div className="code" ref="code">
              <Code noteText={this.state.noteText} />
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
                <input type="text" name="title" defaultValue={updatedNote.title} onChange={::this._updateInput} />
              </div>
              <div className="field text">
                <textarea name="text" onChange={::this._updateInput} defaultValue={updatedNote.text} />
              </div>
              <div className="field keywords">
                <input type="text" name="keywords" defaultValue={updatedNote.keywords} onChange={::this._updateInput} />
              </div>
              <div className="field date">
                <input type="text" name="date" defaultValue={updatedNote.date} onChange={::this._updateInput} />
              </div>
              <div className="buttons">
                <button className="icon fa fa-floppy-o" onClick={::this._saveNote}></button>
                <button className="icon fa fa-ban" onClick={() => this.setState({ editable: false })}></button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
