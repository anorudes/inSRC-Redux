import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { win } from '../../nw.js';

// Component styles
import { styles } from './styles.scss';

import { linkAndBold } from './_linkAndBold';
import { Code } from './_code';

export class NoteFull extends Component {
  static propTypes = {
    note: React.PropTypes.object,
    saveNote: React.PropTypes.func,
    closeNote: React.PropTypes.func,
    deleteNote: React.PropTypes.func,
    fields: React.PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = { editable: false };
  }

  componentDidMount() {
    this._linkAndBold();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note.id !== this.props.note.id) {
      this._linkAndBold();
    }
  }

  onCloseClick() {
    this.props.closeNote();
  }

  onEditClick() {
    this.setState({ editable: true });
  }

  onDeleteClick(note) {
    /* delete note */
    if (window.confirm('Do you really want to delete?')) {
      this.props.deleteNote(note.id);
      win.focus();
    }
  }

  onSaveClick() {
    const { fields, note: { id } } = this.props;
    this.props.saveNote({
      id: id,
      title: fields.title.value,
      text: fields.text.value,
      keywords: fields.keywords.value,
    });
    this.setState({ editable: false });
  }

  _linkAndBold() {
    /* find and make link, bold text */
    let code = this.refs.code.innerHTML;
    code = code.replace(/http(s?):(<span class="hljs-comment">)+/g, 'http:');
    this.refs.code.innerHTML = linkAndBold(code);
  }

  render() {
    const { note, fields } = this.props;
    const { editable } = this.state;
    return (
      <div className={styles} id="noteFull">
        <div className="close fa fa-times" onClick={() => this.onCloseClick()}></div>
        { /* show note code */}
        { !editable &&
          <div>
            <span className="title">{note.title}</span>
            <div className="code" ref="code">
              <Code noteText={note.text} />
            </div>
            <span className="keywords">{note.keywords}</span>
            <span className="date">{note.date}</span>
            <div className="buttons">
              <i className="icon fa fa-edit" onClick={() => this.onEditClick()}></i>
              <i className="icon fa fa-trash-o" onClick={() => this.onDeleteClick(note) }></i>
            </div>
          </div>
        }

        {/* edit note code */}
        { editable &&
          <div>
            <div className="form">
              <div className="field title">
                <input type="text" name="title" {...fields.title} />
              </div>
              <div className="field text">
                <textarea name="text" {...fields.text} />
              </div>
              <div className="field keywords">
                <input type="text" name="keywords" {...fields.keywords} />
              </div>
              <div className="field date">
                <input type="text" name="date" defaultValue={note.date} />
              </div>
              <div className="buttons">
                <button className="icon fa fa-floppy-o" onClick={::this.onSaveClick}></button>
                <button className="icon fa fa-ban" onClick={() => this.setState({ editable: false })}></button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

NoteFull = reduxForm({
  form: 'noteEdit',
  fields: ['title', 'text', 'keywords'],
  destroyOnUnmount: false,
},
state => ({
  initialValues: state.notes.toJS().activeNote,
}))(NoteFull);

export default NoteFull;
