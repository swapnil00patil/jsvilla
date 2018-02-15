var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET tags listing. */
router.get('/authors', function(req, res, next) {
  db.query("SELECT * FROM js_tags ORDER BY id DESC;SELECT * FROM js_authors ORDER BY id DESC;", ['', ''], function (err, results, fields) {
    if (err) throw err;
    var response = {
      tags: results[0],
      authors: results[1]
    }
    res.send(JSON.stringify(response));
  });
});

module.exports = router;
