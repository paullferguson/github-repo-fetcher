const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema(
  {
    _id: Number,
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
    created_at: Date,
    updated_at: Date,
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