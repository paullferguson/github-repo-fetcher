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

  search (term) {
    console.log(`${term} was searched`);

    // POST the username search
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: { username: term }
    })
    .done(function(msg) {
      console.log( "Ajax success", msg );
    })
    .fail(function(msg) {
      console.log( "Ajax error", msg );
    });
  }

  render () {
    return (
    <main>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </main>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));