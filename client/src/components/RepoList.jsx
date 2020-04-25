import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>Top {props.repos.length} repos, By:xxxxx</p>
    <ul>
      {props.repos.map((repo) =>
        <RepoItem key={repo.repo_id} info={repo} />
      )}
    </ul>
  </div>
)

export default RepoList;