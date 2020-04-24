const request = require('request');
const config = require('../config.js');
const db = require('../database');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

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
    } else {
      body = JSON.parse(body)
      db.save(body.items);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;