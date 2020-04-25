import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this)

  }

  componentDidMount() {

    $.ajax({
      url: '/repos',
      method: 'GET',
      context: this
    })
    .done(function(repos) {
      console.log( "Get all success", repos );
      this.setState((prev) => ({
        repos
      }));
    })
    .fail(function(err) {
      console.log( "Get all error", err );
    });

  }

  search (term) {
    if (term) {
      // POST the username search
      $.ajax({
        url: '/repos',
        method: 'POST',
        data: { username: term }
      })
      .done(function(msg) {
        console.log( "Post success", msg );
      })
      .fail(function(msg) {
        console.log( "Post error", msg );
      });
    }
  }

  render () {
    return (
    <main>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </main>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));