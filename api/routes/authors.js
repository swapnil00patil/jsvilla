var express = require('express');
var db = require('../utils/db');
var router = express.Router();

router.post('/', function(req, res, next) {
  let request = req.body;
  db.query("INSERT INTO js_authors SET name='"+ request.name +"'", function (err, result, fields) {
    if (err) throw err;
    let authorId = result.insertId;
    res.send(JSON.stringify(authorId));
  });
});

module.exports = router;
