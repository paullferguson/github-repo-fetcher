import React from 'react';

class RepoItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  render() {
    const { name, full_name, owner, html_url, description, url, created_at, updated_at, size, stargazers_count, watchers_count, forks_count, open_issues_count } = this.props.info;
    return(
      <li>
          <a href={html_url} target="_blank">
            <img src={owner.avatar_url} alt="{owner.login}" height="46" width="45"/>
            <div>
              <h3>{name}</h3>
              <h5>by {owner.login}</h5>
              <small>Created {created_at}</small>
            </div>
            <p>{description}</p>
            <ul>
              <li>size: {size}</li>
              <li>stargazers_count: {stargazers_count}</li>
              <li>watchers_count: {watchers_count}</li>
              <li>forks_count: {forks_count}</li>
              <li>open_issues_count: {open_issues_count}</li>
            </ul>
          </a>
      </li>
    )
  }

}

export default RepoItem;