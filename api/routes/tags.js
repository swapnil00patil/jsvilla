var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET tags listing. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM js_tags ORDER BY id DESC", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
