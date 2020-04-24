const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema(
  {
    repo_id: Number,
    name: String,
    full_name: String,
    owner: {
      login: String,
      avatar_url: String,
      html_url: String
    },
    html_url: String,
    description: String,
    url: String,
    created_at: String,
    updated_at: String,
    git_url: String,
    ssh_url: String,
    clone_url: String,
    svn_url: String,
    size: Number,
    stargazers_count: Number,
    watchers_count: Number,
    forks_count: Number,
    open_issues_count: Number
  }
);

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;