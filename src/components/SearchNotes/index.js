import React, { Component } from 'react';
import debounce from 'lodash.debounce';

// Component styles
import styles from './styles';

export class SearchNotes extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    searchNotes: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    /* focus on search input */
    this.refs.search.focus();
    this.props.searchNotes('');
    this.setState({search: ''});
  }

  componentWillUnmount() {
    /* reset search */
    this.props.searchNotes('');
    this.setState({search: ''});
  }

  onChangeSearch(e) {
    const input = e.target;
    this.setState({ search: input.value});
    debounce(() => this.props.searchNotes(input.value), 100)();
  }

  render() {
    return (
      <div className={styles}>
        <input type="text" id="search" ref="search" value={this.state.search} onChange={::this.onChangeSearch} placeholder="search" />
      </div>
    );
  }
}
