const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',{
  useMongoClient: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {console.log('Mongoose connected')});

let repoSchema = mongoose.Schema({
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
    size: Number,
    stargazers_count: Number,
    watchers_count: Number,
    forks_count: Number,
    open_issues_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (dataArr, callback) => {
  dataArr.forEach((repo) => {
    console.log('Saving to Mongo < ', repo.full_name);

    Repo.create({
      repo_id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url
      },
      html_url: repo.html_url,
      description: repo.description,
      url: repo.url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count

    }, function (err, repo) {
      if (err) return handleError(err);
    });
  });
}

module.exports.save = save;
module.exports.Repo = Repo;