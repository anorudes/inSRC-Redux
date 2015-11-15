import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import history from '../../history';

// Component styles
import styles from './styles';

export class AddNote extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    notes: React.PropTypes.array,
    actions: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { closeAnimate: false, editable: false, note: {
      title: '',
      keywords: '',
      text: '',
      date: moment().format('DD/MM/YYYY'),
    }};
  }

  componentDidMount() {
    this.refs.title.focus();
  }

  onClickAdd() {
    this.props.actions.addNote(this.state.note);
    history.replaceState(null, '/list');
  }

  onChangeInput(event) {
    const input = event.currentTarget;
    const name = input.getAttributeNode('name').value;
    this.setState({
      note: {
        ...this.state.note,
        [name]: input.value,
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
            <input type="text" ref="title" name="title" defaultValue={note.title} onChange={::this.onChangeInput} />
          </div>
          <div className="field text">
            <textarea name="text" onChange={::this.onChangeInput} defaultValue={note.text} />
          </div>
          <div className="field keywords">
            <input type="text" namr="keywords" defaultValue={note.keywords} onChange={::this.onChangeInput} />
          </div>
          <div className="field date">
            <input type="text" name="date" defaultValue={note.date} onChange={::this.onChangeInput} disabled="true" />
          </div>
          <div className="buttons">
            <button className="icon fa fa-floppy-o" onClick={::this.onClickAdd}></button>
            <Link to={`/list/`}>
              <button className="icon fa fa-ban"></button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
