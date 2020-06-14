import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    axios.get('/api/repos')
      .then((repos) => {
        this.setState({ repos: repos.data });
      })
      .catch((err) => {
        console.log( "Get all error", err );
      });
  }


  search(term) {
    if (term) {
      axios.post('/api/repos', { username: term })
        .then((repos) => {
          this.setState({ repos: repos.data });
        })
        .catch((err) => {
          console.log( "Post error", err );
        });
    }
  }


  clear() {
    axios.post('/api/clear')
      .then((repos) => {
        this.setState({ repos: repos.data });
      })
      .catch((err) => {
        console.log( "Clear Repos error", err );
      });
  }


  handleClickOrderBy(orderBy) {
    axios(`/api/repos/${orderBy}`)
      .then((repos) => {
        this.setState({
          repos: repos.data,
          orderBy
        });
      })
      .catch((err) => {
        console.log( `Get by ${orderBy} error`, err );
      });
  }

  render () {
    return (
    <main>
      <h1>Github Repo Fetcher</h1>
      <Search onSearch={this.search} onClear={this.clear}/>
      <RepoList repos={this.state.repos} orderBy={this.state.orderBy} onOrderBy={this.handleClickOrderBy}/>
    </main>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));