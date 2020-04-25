const express = require('express');
const Promise = require('bluebird');
const helper = require('../helpers/github');
const mongoose = require('../database');
const app = express();
const port = 1128;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.post('/api/repos', function (req, resp) {
  helper.getReposByUsername(req.body.username, (err)=>{
    if (err){
      throw err;
    } else {
      mongoose.Repo.find({}).limit(25).sort({size:-1})
        .then((repos) => {
          resp.send(repos);
        })
        .catch(err => resp.status(500).send(err));
    }
  });
});


app.get('/api/repos', function (req, resp) {
  mongoose.Repo.find({}).limit(25).sort({size:-1})
    .then((repos) => {
      resp.send(repos);
    })
    .catch(err => resp.status(500).send(err));
});

app.get('/api/repos/:orderBy', function (req, resp) {
  console.log(req.params.orderBy);
  mongoose.Repo.find({}).limit(25).sort({[req.params.orderBy]:1})
    .then((repos) => {
      resp.send(repos);
    })
    .catch(err => resp.status(500).send(err));
  });


// Kick it off
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

