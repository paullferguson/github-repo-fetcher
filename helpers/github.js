const request = require('request');
const promise = require('bluebird');
const config = require('../config.js');
const mongoose = require('../database');

let getReposByUsername = (username, cb) => {

  let options = {
    url: `https://api.github.com/search/repositories?q=user:${username}`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (err, resp, body) {
    if (err) {
      console.log('Git request error' , err);
      cb(err);
    } else {

      body = JSON.parse(body);
      body.items.forEach((repo) => {
        console.log('Saving to Mongo < ', repo.full_name);

        let promise = mongoose.Repo.findOne({repo_id: repo.id}, function(err, checkRepo){
          if(err) console.log(err);
          if (checkRepo) {
            console.log('This repo has already been saved');
          } else {

            mongoose.Repo.create({
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
            });
          }
        });
        promise.then(function () {
          cb(null);
        })
      });
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;