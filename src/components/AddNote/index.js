import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
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

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.refs.title.focus();
  }

  _addNote() {
    const { router } = this.context;
    this.actions.addNote(this.state.note);
    router.transitionTo('list');
  }

  _updateInput(ref) {
    const input = event.target;
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
            <input type="text" ref="title" value={note.title} onChange={() => this._updateInput('title')} />
          </div>
          <div className="field text">
            <textarea ref="text" onChange={() => this._updateInput('text')} value={note.text} />
          </div>
          <div className="field keywords">
            <input type="text" ref="keywords" value={note.keywords} onChange={() => this._updateInput('keywords')} />
          </div>
          <div className="field date">
            <input type="text" ref="date" value={note.date} onChange={() => this._updateInput('date')} disabled="true" />
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
