import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import history from '../../history'

// Component styles
import styles from './styles';
import * as actionCreators from 'actions/notes';

@connect(state => state.notes)
export class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = { closeAnimate: false, editable: false, note: {
      title: "",
      keywords: "",
      text: "",
      date: moment().format('DD/MM/YYYY'),
    }};
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }
  
  componentDidMount() {
    this.refs.title.focus();
  }

  _addNote() {
    console.log(this.state.note);
    this.actions.addNote(this.state.note);
    history.replaceState(null, 'list')
  }

  _updateInput(e, ref) {
    const input = e.currentTarget;
    this.setState({
      note: {
        ...this.state.note,
        [ref]: input.value,
      },
    });
  }
  render() {
    const { note } = this.state;
    return (
      <div className={styles} >
        <div className="form">
          <h2>Add note</h2>
          <div className="field title">
            <input type="text" ref="title" value={note.title} onChange={(e) => this._updateInput(e, 'title')} />
          </div>
          <div className="field text">
            <textarea ref="text" onChange={(e) => this._updateInput(e, 'text')} value={note.text} />
          </div>
          <div className="field keywords">
            <input type="text" ref="keywords" value={note.keywords} onChange={(e) => this._updateInput(e, 'keywords')} />
          </div>
          <div className="field date">
            <input type="text" ref="date" value={note.date} onChange={(e) => this._updateInput(e, 'date')} disabled="true" />
          </div>
          <div className="buttons">
            <button className="icon fa fa-floppy-o" onClick={() => this._addNote()}></button>
            <Link to={`/list/`}>
              <button className="icon fa fa-ban"></button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
