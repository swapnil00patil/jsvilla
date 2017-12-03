var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM js_wall_posts ORDER BY id DESC", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
