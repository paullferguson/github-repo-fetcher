import React from 'react';
import RepoItem from './RepoItem.jsx';

class RepoList extends React.Component {
  constructor(props) {
    super(props);

    this.clickOrderBy = this.clickOrderBy.bind(this);
  }

  clickOrderBy(e) {
    e.preventDefault();
    this.props.onOrderBy(e.target.dataset.by);
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {

    const { orderBy } = this.props;
    let oByName;
    if (orderBy === 'size') oByName = 'Size';
    if (orderBy === 'forks_count') oByName = 'Forks';
    if (orderBy === 'stargazers_count') oByName = 'Stars';
    if (orderBy === 'watchers_count') oByName = 'Watchers';
    if (orderBy === 'open_issues_count') oByName = 'Open Issues';
    oByName = this.capitalize(oByName);

    return(
      <div>
        <h4> Repo List Component </h4>
        <p>Top {this.props.repos.length} repos, by <strong>{oByName}</strong></p>
        <button onClick={this.clickOrderBy} data-by="size" >Size</button>
        <button onClick={this.clickOrderBy} data-by="forks_count" >Forks</button>
        <button onClick={this.clickOrderBy} data-by="stargazers_count" >Stars</button>
        <button onClick={this.clickOrderBy} data-by="watchers_count" >Watchers</button>
        <button onClick={this.clickOrderBy} data-by="open_issues_count" >Open Issues</button>
        <ul className="repo-list">
          {this.props.repos.map((repo) =>
            <RepoItem key={repo.repo_id} info={repo} />
          )}
        </ul>
      </div>
    )
  }
}

export default RepoList;