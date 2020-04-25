import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);

  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    this.setState({
      term: ''
    });
  }

  clear(e) {
    e.preventDefault();
    this.props.onClear();
  }

  render() {
    return (
    <div className="app__header">
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange}/>
      <button onClick={this.search}> Add Repos </button>
      <button onClick={this.clear}> Clear Repos </button>
    </div>
    )
  }
}

export default Search;