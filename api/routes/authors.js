var express = require('express');
var db = require('../utils/db');
var router = express.Router();

router.post('/', function(req, res, next) {
  var request = req.body;
  request = {
    name: db.escape(request.name) || '',
    unique_value: db.escape(request.name.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()),
    description: db.escape(request.description) || '',
    twitter_url: db.escape(request.twitter_url) || '',
    github_url: db.escape(request.github_url) || ''
  }
  db.query("INSERT INTO js_authors SET unique_value="+ request.unique_value +", name="+ request.name +", description="+ request.description +", twitter_url="+ request.twitter_url +", github_url="+ request.github_url +"", function (err, result, fields) {
    if (err) throw err;
    var authorId = result.insertId;
    res.send(JSON.stringify(authorId));
  });
});

module.exports = router;
