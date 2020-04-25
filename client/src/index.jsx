import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      orderBy: 'size',
    }

    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.handleClickOrderBy = this.handleClickOrderBy.bind(this);

  }

  componentDidMount() {
    $.ajax({
      url: '/api/repos',
      method: 'GET',
      context: this
    })
    .done(function(repos) {
      this.setState({
        repos
      });
    })
    .fail(function(err) {
      console.log( "Get all error", err );
    });
  }


  search (term) {
    if (term) {
      // POST the username search
      $.ajax({
        url: '/api/repos',
        method: 'POST',
        data: { username: term },
        context: this
      })
      .done(function(repos) {
        this.setState({
          repos
        });
        })
      .fail(function(err) {
        console.log( "Post error", err );
      });
    }
  }


  clear () {
    $.ajax({
      url: '/api/clear',
      method: 'POST',
      context: this
    })
    .done(function(repos) {
      this.setState({
        repos
      });
      })
    .fail(function(err) {
      console.log( "Post error", err );
    });
  }


  handleClickOrderBy(orderBy) {
    $.ajax({
      url: `/api/repos/${orderBy}`,
      method: 'GET',
      context: this
    })
    .done((repos) => {
      this.setState((prev) => ({
        repos,
        orderBy
      }));
    })
    .fail((err) => {
      console.log( `Get by ${orderBy} error`, err );
    });
  }

  render () {
    return (
    <main>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search} onClear={this.clear}/>
      <RepoList repos={this.state.repos} orderBy={this.state.orderBy} onOrderBy={this.handleClickOrderBy}/>
    </main>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));