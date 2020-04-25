import React from 'react';

class RepoItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  render() {
    const { name, full_name, owner, html_url, description, url, created_at, updated_at, size, stargazers_count, watchers_count, forks_count, open_issues_count } = this.props.info;
    return(
      <li className="repo-item">
          <a href={html_url} target="_blank">
            <div className="repo-item__header">
              <img src={owner.avatar_url} alt="{owner.login}" height="46" width="45"/>
              <div>
                <h3>{name}</h3>
                <h5>by {owner.login}</h5>
                <small>Created {created_at}</small>
              </div>
            </div>
            {/* <p>{description}</p> */}
            <ul className="repo-item__details">
              <li>size: <strong>{size}</strong></li>
              <li>stars: <strong>{stargazers_count}</strong></li>
              <li>watchers: <strong>{watchers_count}</strong></li>
              <li>forks: <strong>{forks_count}</strong></li>
              <li>open issues: <strong>{open_issues_count}</strong></li>
            </ul>
          </a>
      </li>
    )
  }

}

export default RepoItem;