var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET tags listing. */
router.get('/authors/:limit', function(req, res, next) {
  var generateSQL;
  var limit = req.params && req.params.limit;
  if(limit && limit !== '0') {
    generateSQL = 'SELECT * FROM js_tags ORDER BY id DESC LIMIT ' +limit+ ';SELECT * FROM js_authors ORDER BY id DESC LIMIT ' +limit+ ';';
  } else {
    generateSQL = 'SELECT * FROM js_tags ORDER BY id DESC;SELECT * FROM js_authors ORDER BY id DESC;';
  }
  db.query(generateSQL, ['', ''], function (err, results, fields) {
    if (err) throw err;
    var response = {
      tags: results[0],
      authors: results[1]
    }
    res.send(JSON.stringify(response));
  });
});

module.exports = router;
