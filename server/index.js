const express = require('express');
const helper = require('../helpers/github');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/repos', function (req, resp) {
  helper.getReposByUsername(req.body.username);
  // Not sure if this is premature but don't want to leave the browser hanging
  resp.sendStatus(200);
});


app.get('/repos', function (req, resp) {
  db.Repo.find({}, (err, data) => {
    resp.send(data);
  }).limit(25).sort({size:1});
});


// Sorting in Mongo
// db.repos.find().sort({size:-1}).limit(25)


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

